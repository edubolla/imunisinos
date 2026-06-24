import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IMUNI_SYSTEM_PROMPT } from "@/lib/imuni-system-prompt";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isValidMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown } | null)?.messages;

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

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: IMUNI_SYSTEM_PROMPT,
      messages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Erro ao chamar a API da Anthropic:", error);
    return NextResponse.json(
      { error: "Não foi possível obter resposta da Imuni agora. Tente novamente em instantes." },
      { status: 500 },
    );
  }
}
