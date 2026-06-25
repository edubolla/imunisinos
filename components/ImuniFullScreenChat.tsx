"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { IMUNI_QUICK_REPLIES, useImuniChat } from "@/lib/hooks/use-imuni-chat";
import { CONTACT } from "@/lib/constants";

export default function ImuniFullScreenChat() {
  const { messages, isLoading, sendMessage } = useImuniChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void sendMessage(input);
    setInput("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-light p-3 sm:p-6 lg:p-10">
      <div className="flex h-[88vh] max-h-[760px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl">
        <header className="flex items-center justify-between gap-4 bg-primary px-4 py-3 text-white sm:px-6">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src="/images/logo/logo_imunisinos.webp"
              alt="Logo da Imunisinos"
              width={40}
              height={40}
              fallbackLabel="Logo"
              className="h-10 w-10 rounded-md object-contain"
            />
            <div className="min-w-0">
              <p className="font-heading text-base font-bold leading-tight sm:text-lg">Imuni</p>
              <p className="hidden truncate text-xs text-white/85 sm:block">
                Assistente virtual da Imunisinos
              </p>
            </div>
          </div>
          <Link
            href="/institucional"
            className="flex-shrink-0 rounded-full border border-white/50 px-3 py-1.5 font-body text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Conhecer o site completo
          </Link>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-primary-light/40 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 font-body text-sm sm:text-base ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-secondary shadow-sm"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <p className="rounded-2xl bg-white px-4 py-2.5 font-body text-sm text-secondary/60 shadow-sm">
                  Imuni está digitando...
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-black/5 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {IMUNI_QUICK_REPLIES.map((reply) => (
              <button
                key={reply.label}
                type="button"
                onClick={() => void sendMessage(reply.message)}
                disabled={isLoading}
                className="rounded-full bg-primary-light px-3 py-1.5 font-body text-xs font-semibold text-primary-dark transition-colors hover:bg-primary/15 disabled:opacity-50"
              >
                {reply.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <label htmlFor="imuni-fullscreen-input" className="sr-only">
              Digite sua mensagem para a Imuni
            </label>
            <input
              id="imuni-fullscreen-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 font-body text-sm text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary sm:text-base"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-primary px-6 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              Enviar
            </button>
          </form>

          <p className="mt-3 text-center font-body text-xs text-secondary/50">
            Prefere falar direto?{" "}
            <a
              href={CONTACT.whatsappUrlWithMessage(
                "Olá! Vim do painel da Imuni e gostaria de continuar o atendimento por aqui.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Fale pelo WhatsApp
            </a>{" "}
            ou ligue{" "}
            <a href={CONTACT.phoneTel} className="font-semibold text-primary hover:underline">
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
