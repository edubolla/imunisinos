import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IMUNI_SYSTEM_PROMPT } from "@/lib/imuni-system-prompt";
import { ENVIAR_LEAD_TOOL } from "@/lib/imuni-tools";
import {
  conversationAlreadySentLead,
  conversationHasPhone,
  isLeadCanal,
} from "@/lib/imuni-lead";
import {
  buildLeadWhatsappUrl,
  isLeadPayload,
  sendLeadToWebhook,
  type LeadPayload,
} from "@/lib/send-lead-webhook";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_TOOL_ITERATIONS = 3;

function isValidMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const payload =
    (body as {
      messages?: unknown;
      canal?: unknown;
      pagina?: unknown;
      leadEnviado?: unknown;
    } | null) ?? {};
  const messages = payload.messages;

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return NextResponse.json(
      {
        error:
          "O campo 'messages' é obrigatório e deve ser um array de { role, content }, com role 'user' ou 'assistant'.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY não está configurada.");
    return NextResponse.json(
      { error: "Assistente indisponível no momento. Tente novamente mais tarde." },
      { status: 500 },
    );
  }

  const canal = isLeadCanal(payload.canal) ? payload.canal : "site";
  const pagina = optionalString(payload.pagina);
  const shouldForceLead =
    conversationHasPhone(messages) &&
    payload.leadEnviado !== true &&
    !conversationAlreadySentLead(messages);

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
    let leadEnviado = false;

    while (response.stop_reason === "tool_use" && iterations < MAX_TOOL_ITERATIONS) {
      iterations += 1;

      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      );

      conversation.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of toolUseBlocks) {
        if (block.name === "enviar_lead" && isLeadPayload(block.input)) {
          const lead = block.input as LeadPayload;
          const webhookResult = await sendLeadToWebhook(lead, { canal, pagina });
          leadWhatsappUrl = buildLeadWhatsappUrl(lead);
          leadEnviado = webhookResult.ok;

          if (webhookResult.ok) {
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: "Dados recebidos e registrados pela equipe da Imunisinos.",
            });
          } else {
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content:
                "O cadastro interno falhou (webhook indisponível). Confirme os dados ao visitante e oriente a continuar pelo botão de WhatsApp. Não diga que a equipe já recebeu o cadastro interno.",
              is_error: true,
            });
          }
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

    const textBlock = response.content.find((block) => block.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return NextResponse.json({ content, leadWhatsappUrl, leadEnviado });
  } catch (error) {
    console.error("Erro ao chamar a API da Anthropic:", error);
    return NextResponse.json(
      { error: "Não foi possível obter resposta da Imuni agora. Tente novamente em instantes." },
      { status: 500 },
    );
  }
}
