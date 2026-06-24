"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/constants";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_REPLIES = [
  "Solicitar orçamento",
  "Controle de cupins",
  "Controle de insetos",
  "Falar com a equipe",
];

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Olá! Eu sou a Imuni, assistente virtual da Imunisinos 🐜. Posso te ajudar com dúvidas sobre nossos serviços ou já adiantar seu orçamento. Como posso ajudar?",
};

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden="true">
      <rect x="5" y="9" width="14" height="10" rx="2.5" />
      <path strokeLinecap="round" d="M12 9V6m0 0a1.5 1.5 0 1 0-1.5-1.5" />
      <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M9 17h6M3 12h2M19 12h2" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function ImuniChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isExpanded, isLoading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="bg-primary text-white">
      <button
        type="button"
        onClick={() => setIsExpanded((open) => !open)}
        className="container-page flex w-full items-center gap-3 py-3 text-left"
        aria-expanded={isExpanded}
        aria-controls="imuni-chat-panel"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
          <RobotIcon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-sm font-bold sm:text-base">Imuni</span>
          <span className="hidden truncate text-xs text-white/85 sm:block">
            Assistente virtual da Imunisinos — tire suas dúvidas!
          </span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15"
        >
          <ChevronIcon className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </span>
        <span className="sr-only">{isExpanded ? "Minimizar assistente Imuni" : "Abrir assistente Imuni"}</span>
      </button>

      {isExpanded && (
        <div id="imuni-chat-panel" className="container-page animate-fade-in border-t border-white/15 pb-4 pt-3">
          <div
            ref={scrollRef}
            className="max-h-72 space-y-3 overflow-y-auto rounded-xl bg-white p-3 sm:max-h-80"
          >
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 font-body text-sm ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-primary-light text-secondary"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <p className="rounded-2xl bg-primary-light px-4 py-2 font-body text-sm text-secondary/60">
                  Imuni está digitando...
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => void sendMessage(reply)}
                disabled={isLoading}
                className="rounded-full bg-white/15 px-3 py-1.5 font-body text-xs font-semibold text-white transition-colors hover:bg-white/25 disabled:opacity-50"
              >
                {reply}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <label htmlFor="imuni-chat-input" className="sr-only">
              Digite sua mensagem para a Imuni
            </label>
            <input
              id="imuni-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full border-none bg-white px-4 py-2 font-body text-sm text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-secondary px-5 py-2 font-body text-sm font-bold text-white transition-opacity disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
