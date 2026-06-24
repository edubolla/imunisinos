"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const IMUNI_QUICK_REPLIES = [
  "Solicitar orçamento",
  "Controle de cupins",
  "Controle de insetos",
  "Falar com a equipe",
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
