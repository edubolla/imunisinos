import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IMUNI_SYSTEM_PROMPT } from "@/lib/imuni-system-prompt";
import { ENVIAR_LEAD_TOOL } from "@/lib/imuni-tools";
import {
  conversationHasPhone,
  conversationReadyForCompleteLead,
  extractPhone,
  resolveConversaId,
  shouldForceLeadTool,
} from "@/lib/imuni-lead";
import {
  buildLeadWhatsappUrl,
  isLeadPayload,
  prepareLeadForWebhook,
  sendLeadToWebhook,
  type LeadPayload,
  type PreparedLead,
} from "@/lib/send-lead-webhook";

export const runtime = "nodejs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const MAX_TOOL_ITERATIONS = 3;

function isValidMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

async function dispatchLeadWebhooks(options: {
  lead: PreparedLead;
  conversaId: string;
  alreadySentContato: boolean;
  alreadySentComercial: boolean;
  readyForComercial: boolean;
}): Promise<{ sentContato: boolean; sentComercial: boolean; whatsappUrl?: string }> {
  let sentContato = options.alreadySentContato;
  let sentComercial = options.alreadySentComercial;
  let whatsappUrl: string | undefined;

  if (!sentContato) {
    await sendLeadToWebhook(options.lead, { etapa: "contato", conversaId: options.conversaId });
    sentContato = true;
    whatsappUrl = buildLeadWhatsappUrl(options.lead);
  }

  const shouldSendComercial =
    !sentComercial && (options.lead.lead_completo || options.readyForComercial);

  if (shouldSendComercial) {
    await sendLeadToWebhook(options.lead, { etapa: "comercial", conversaId: options.conversaId });
    sentComercial = true;
    whatsappUrl = buildLeadWhatsappUrl(options.lead);
  }

  return { sentContato, sentComercial, whatsappUrl };
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Corpo da requisição inválido." }, 400);
  }

  const payload =
    (body as {
      messages?: unknown;
      leadEnviado?: unknown;
      leadCompleto?: unknown;
      conversaId?: unknown;
    } | null) ?? {};
  const messages = payload.messages;

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return jsonResponse(
      {
        error:
          "O campo 'messages' é obrigatório e deve ser um array de { role, content }, com role 'user' ou 'assistant'.",
      },
      400,
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY não está configurada.");
    return jsonResponse(
      { error: "Assistente indisponível no momento. Tente novamente mais tarde." },
      500,
    );
  }

  const conversaId = resolveConversaId(payload.conversaId);
  const alreadySentContato = payload.leadEnviado === true;
  const alreadySentComercial = payload.leadCompleto === true;
  const hasPhone = conversationHasPhone(messages);
  const readyForComercial = conversationReadyForCompleteLead(messages);
  const shouldForceLead = shouldForceLeadTool({
    hasPhone,
    leadEnviado: alreadySentContato,
    leadCompleto: alreadySentComercial,
    readyForComercial,
  });

  try {
    const client = new Anthropic({ apiKey });
    const conversation: Anthropic.MessageParam[] = [...messages];

    let response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: IMUNI_SYSTEM_PROMPT,
      tools: [ENVIAR_LEAD_TOOL],
      tool_choice: shouldForceLead ? { type: "tool", name: "enviar_lead" } : { type: "auto" },
      messages: conversation,
    });

    let iterations = 0;
    let leadWhatsappUrl: string | undefined;
    let sentContato = alreadySentContato;
    let sentComercial = alreadySentComercial;

    while (response.stop_reason === "tool_use" && iterations < MAX_TOOL_ITERATIONS) {
      iterations += 1;

      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      );

      conversation.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of toolUseBlocks) {
        if (block.name === "enviar_lead" && isLeadPayload(block.input)) {
          const prepared = prepareLeadForWebhook(block.input, messages);
          const dispatched = await dispatchLeadWebhooks({
            lead: prepared,
            conversaId,
            alreadySentContato: sentContato,
            alreadySentComercial: sentComercial,
            readyForComercial,
          });
          sentContato = dispatched.sentContato;
          sentComercial = dispatched.sentComercial;
          if (dispatched.whatsappUrl) leadWhatsappUrl = dispatched.whatsappUrl;
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: sentComercial
              ? "Dados e contexto da conversa registrados para o comercial da Imunisinos."
              : "Telefone registrado. Continue coletando nome e serviço se ainda faltarem. Confirme que o número foi anotado, sem encerrar a conversa.",
          });
        } else {
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: "Não foi possível registrar os dados informados.",
            is_error: true,
          });
        }
      }

      conversation.push({ role: "user", content: toolResults });

      response = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: IMUNI_SYSTEM_PROMPT,
        tools: [ENVIAR_LEAD_TOOL],
        messages: conversation,
      });
    }

    if (hasPhone && (!sentContato || (!sentComercial && readyForComercial))) {
      const telefone = extractPhone(messages);
      if (telefone) {
        const fallbackLead: LeadPayload = { nome: "", telefone, servico_interesse: "" };
        const prepared = prepareLeadForWebhook(fallbackLead, messages);
        const dispatched = await dispatchLeadWebhooks({
          lead: prepared,
          conversaId,
          alreadySentContato: sentContato,
          alreadySentComercial: sentComercial,
          readyForComercial,
        });
        sentContato = dispatched.sentContato;
        sentComercial = dispatched.sentComercial;
        if (dispatched.whatsappUrl) leadWhatsappUrl = dispatched.whatsappUrl;
      }
    }

    const textBlock = response.content.find((block) => block.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return jsonResponse({
      content,
      leadWhatsappUrl,
      leadCompleto: sentComercial,
    });
  } catch (error) {
    console.error("Erro ao chamar a API da Anthropic:", error);
    return jsonResponse(
      { error: "Não foi possível obter resposta da Imuni agora. Tente novamente em instantes." },
      500,
    );
  }
}
