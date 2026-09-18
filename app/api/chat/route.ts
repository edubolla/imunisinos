import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IMUNI_SYSTEM_PROMPT } from "@/lib/imuni-system-prompt";
import { ENVIAR_LEAD_TOOL } from "@/lib/imuni-tools";
import { buildLeadWhatsappUrl, sendLeadToWebhook, type LeadPayload } from "@/lib/send-lead-webhook";

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

function isLeadPayload(value: unknown): value is LeadPayload {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.nome === "string" && typeof candidate.telefone === "string";
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Corpo da requisição inválido." }, 400);
  }

  const messages = (body as { messages?: unknown } | null)?.messages;

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

  try {
    const client = new Anthropic({ apiKey });
    const conversation: Anthropic.MessageParam[] = [...messages];

    let response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: IMUNI_SYSTEM_PROMPT,
      tools: [ENVIAR_LEAD_TOOL],
      messages: conversation,
    });

    let iterations = 0;
    let leadWhatsappUrl: string | undefined;

    while (response.stop_reason === "tool_use" && iterations < MAX_TOOL_ITERATIONS) {
      iterations += 1;

      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      );

      conversation.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of toolUseBlocks) {
        if (block.name === "enviar_lead" && isLeadPayload(block.input)) {
          await sendLeadToWebhook(block.input);
          leadWhatsappUrl = buildLeadWhatsappUrl(block.input);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: "Dados recebidos e registrados pela equipe da Imunisinos.",
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

    const textBlock = response.content.find((block) => block.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return jsonResponse({ content, leadWhatsappUrl });
  } catch (error) {
    console.error("Erro ao chamar a API da Anthropic:", error);
    return jsonResponse(
      { error: "Não foi possível obter resposta da Imuni agora. Tente novamente em instantes." },
      500,
    );
  }
}
