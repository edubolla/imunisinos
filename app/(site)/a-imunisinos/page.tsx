import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import CTASection from "@/components/sections/CTASection";
import { teamMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "A Imunisinos",
  description:
    "Conheça a história da Imunisinos: 40 anos de tradição familiar em controle de pragas no Vale dos Sinos, Vale do Paranhana e Serra Gaúcha.",
};

const VALUES = [
  {
    title: "Responsabilidade",
    description: "Assumimos o compromisso com a saúde e a segurança de cada ambiente que atendemos.",
  },
  {
    title: "Prestatividade",
    description: "Estamos sempre disponíveis para ouvir, orientar e resolver com agilidade.",
  },
  {
    title: "Honestidade",
    description: "Transparência em cada diagnóstico, orçamento e serviço realizado.",
  },
];

export default function AImunisinosPage() {
  return (
    <>
      <section className="bg-primary-light py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="font-body text-sm font-bold uppercase tracking-wide text-primary">
              Desde 1986
            </span>
            <h1 className="mt-2 font-heading text-4xl font-bold text-secondary sm:text-5xl">
              A Imunisinos
            </h1>
            <p className="mt-5 font-body text-base text-secondary/80 sm:text-lg">
              Desde 1986, a Imunisinos oferece soluções completas de controle de pragas. Somos
              uma empresa familiar, com uma história de dedicação e compromisso em manter
              ambientes saudáveis e protegidos.
            </p>
            <p className="mt-4 font-body text-base text-secondary/80 sm:text-lg">
              Estamos na terceira geração à frente do negócio, com Alan de Sá e Renata de Sá, que
              somam mais de 15 anos de experiência no setor.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
            <ImageWithFallback
              src="/images/servicos/controle_integrado_de_pragas_02.jpg"
              alt="Técnico da Imunisinos durante atendimento de controle de pragas"
              fill
              fallbackLabel="Equipe Imunisinos"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nosso propósito"
            title="Missão"
            description="Nosso objetivo é claro: ser reconhecidos como a melhor empresa de controle de pragas da região, oferecendo um atendimento próximo, flexível e confiável. Trabalhamos com responsabilidade, prestatividade e honestidade, sempre buscando a excelência."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
                <h3 className="font-heading text-lg font-bold text-primary-dark">{value.title}</h3>
                <p className="mt-2 font-body text-sm text-secondary/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-light py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quem está à frente"
            title="Nossa equipe"
            description="Gestão familiar com mais de 15 anos de experiência no setor de controle de pragas."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-2xl">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    fallbackLabel={member.name}
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-secondary">{member.name}</h3>
                <p className="font-body text-sm text-primary-dark">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Quer conhecer nossos serviços?"
        description="Conheça as soluções completas que a Imunisinos oferece para proteger o seu ambiente."
      />
    </>
  );
}
