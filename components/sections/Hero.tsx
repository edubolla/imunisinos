import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { CONTACT, SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-primary-light">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 font-body text-sm font-bold text-primary-dark">
            Há 40 anos no Vale dos Sinos, Vale do Paranhana e Serra Gaúcha
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-secondary sm:text-5xl">
            Controle de pragas com quem você confia
          </h1>
          <p className="mt-5 max-w-lg font-body text-lg text-secondary/70">{SITE.slogan}.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT.whatsappUrlWithMessage(
                "Olá! Gostaria de solicitar um orçamento com a Imunisinos.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-8 py-3.5 text-center font-body text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Solicitar orçamento
            </a>
            <Link
              href="/servicos"
              className="rounded-full border-2 border-secondary px-8 py-3.5 text-center font-body text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-white"
            >
              Conheça nossos serviços
            </Link>
          </div>
          <a href={CONTACT.phoneTel} className="mt-4 inline-block font-body text-sm font-semibold text-secondary/70 hover:text-primary">
            Ou ligue: {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
          <ImageWithFallback
            src="/images/servicos/dedetizacao_04.webp"
            alt="Técnico da Imunisinos realizando controle de pragas em ambiente residencial"
            fill
            priority
            fallbackLabel="Imunisinos em ação"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
