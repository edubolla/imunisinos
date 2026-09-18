"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  whatsappUrl?: string;
};

export type QuickReply = {
  label: string;
  message: string;
};

export const IMUNI_QUICK_REPLIES: QuickReply[] = [
  { label: "Solicitar orçamento", message: "Quero solicitar um orçamento." },
  { label: "Controle de Insetos", message: "Tenho interesse no serviço de Controle de Insetos." },
  { label: "Controle de Cupins", message: "Tenho interesse no serviço de Controle de Cupins." },
  { label: "Controle de Ratos", message: "Tenho interesse no serviço de Controle de Ratos." },
  {
    label: "Outros",
    message: "Tenho outro tipo de necessidade ou dúvida que não está nas opções acima.",
  },
];

export const IMUNI_INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Olá! Sou a Imuni, assistente virtual da Imunisinos. Posso esclarecer dúvidas sobre os nossos serviços ou registrar seus dados para um orçamento. Como posso ajudá-lo?",
};

const WIDGET_STORAGE_KEY = "imuni-widget-messages";
const FALLBACK_CHAT_API = "https://imunisinos.vercel.app/api/chat";

function isWidgetPath() {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/widget");
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

function readStoredWidgetMessages(): ChatMessage[] | null {
  if (!isWidgetPath()) return null;
  try {
    const raw = sessionStorage.getItem(WIDGET_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every(isChatMessage)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function resolveChatUrl() {
  if (typeof window === "undefined") return "/api/chat";
  const origin = window.location.origin;
  if (origin && origin !== "null") {
    return `${origin}/api/chat`;
  }
  return FALLBACK_CHAT_API;
}

export function useImuniChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([IMUNI_INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredWidgetMessages();
    if (stored) setMessages(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !isWidgetPath()) return;
    try {
      sessionStorage.setItem(WIDGET_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Third-party iframe storage can be blocked; the in-memory conversation still works.
    }
  }, [messages, ready]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading || !ready) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setIsLoading(true);

    const body = JSON.stringify({
      messages: nextMessages.map(({ role, content }) => ({ role, content })),
    });

    try {
      const response = await fetch(resolveChatUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        cache: "no-store",
        keepalive: body.length < 60_000,
      });

      if (!response.ok) {
        throw new Error("Falha ao obter resposta da Imuni");
      }

      const data: { content: string; leadWhatsappUrl?: string } = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.content, whatsappUrl: data.leadWhatsappUrl },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `Não consegui me conectar agora. Tente novamente em instantes ou fale direto com a nossa equipe pelo telefone/WhatsApp ${CONTACT.phoneDisplay}.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, isLoading, sendMessage };
}
