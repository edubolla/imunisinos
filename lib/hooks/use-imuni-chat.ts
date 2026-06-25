"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
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

export function useImuniChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([IMUNI_INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Falha ao obter resposta da Imuni");
      }

      const data: { content: string } = await response.json();
      setMessages((current) => [...current, { role: "assistant", content: data.content }]);
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
