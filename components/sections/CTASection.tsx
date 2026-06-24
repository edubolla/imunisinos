import Link from "next/link";
import { CONTACT } from "@/lib/constants";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export default function CTASection({
  title = "Pronto para proteger seu ambiente?",
  description = "Fale agora com a nossa equipe e solicite um orçamento sem compromisso.",
}: CTASectionProps) {
  return (
    <section className="bg-primary">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="max-w-xl font-body text-base text-white/90 sm:text-lg">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={CONTACT.whatsappUrlWithMessage(
              "Olá! Gostaria de solicitar um orçamento com a Imunisinos.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-secondary px-8 py-3 font-body text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Solicitar orçamento pelo WhatsApp
          </a>
          <Link
            href="/servicos"
            className="rounded-full border-2 border-white px-8 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary"
          >
            Ver todos os serviços
          </Link>
        </div>
        <a href={CONTACT.phoneTel} className="font-body text-sm font-semibold text-white/90 hover:text-white">
          Ou ligue agora: {CONTACT.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
