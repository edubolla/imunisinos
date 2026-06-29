"use client";

import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import LinkifiedText from "@/components/LinkifiedText";
import WhatsAppLeadButton from "@/components/WhatsAppLeadButton";
import { IMUNI_QUICK_REPLIES, useImuniChat } from "@/lib/hooks/use-imuni-chat";
import { CONTACT } from "@/lib/constants";

export default function ImuniWidgetChat() {
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
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <header className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
        <ImageWithFallback
          src="/images/logo/logo_imunisinos.webp"
          alt="Logo da Imunisinos"
          width={36}
          height={36}
          fallbackLabel="Logo"
          className="h-9 w-9 rounded-md object-contain"
        />
        <div className="min-w-0">
          <p className="font-heading text-sm font-bold leading-tight">Imuni</p>
          <p className="truncate text-xs text-white/85">Assistente virtual da Imunisinos</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-primary-light/40 px-3 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className="flex max-w-[85%] flex-col gap-2">
                <p
                  className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 font-body text-sm ${
                    message.role === "user" ? "bg-primary text-white" : "bg-white text-secondary shadow-sm"
                  }`}
                >
                  <LinkifiedText text={message.content} />
                </p>
                {message.whatsappUrl && <WhatsAppLeadButton url={message.whatsappUrl} />}
              </div>
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

      <div className="border-t border-black/5 bg-white px-3 py-3">
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
          <label htmlFor="imuni-widget-input" className="sr-only">
            Digite sua mensagem para a Imuni
          </label>
          <input
            id="imuni-widget-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 font-body text-sm text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
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
  );
}
