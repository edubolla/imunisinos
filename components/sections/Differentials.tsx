import SectionHeading from "@/components/SectionHeading";

const DIFFERENTIALS = [
  {
    title: "Há 40 anos no mercado",
    description: "Mantendo seu ambiente mais saudável e harmonioso desde 1986.",
  },
  {
    title: "Empresa familiar, 3ª geração",
    description: "Tradição e confiança que passam de geração em geração.",
  },
  {
    title: "Gestão experiente",
    description:
      "Alan de Sá e Renata de Sá somam mais de 15 anos de experiência no setor.",
  },
  {
    title: "Atendimento próximo e flexível",
    description: "Confiável e atento às necessidades de cada cliente.",
  },
  {
    title: "Responsabilidade e honestidade",
    description: "Valores centrais que guiam cada serviço prestado.",
  },
  {
    title: "Prestatividade",
    description: "Equipe sempre disponível para tirar dúvidas e orientar.",
  },
];

const ICONS = [
  "M12 8v4l3 3M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "M3 12h4l3-8 4 16 3-8h4",
  "M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5ZM7 12v1a5 5 0 0 0 10 0v-1",
  "M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z",
  "M9 12.5 11 14.5 15.5 9.5M12 3l8 4v5c0 4.5-3.4 7.6-8 9-4.6-1.4-8-4.5-8-9V7l8-4Z",
  "M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5-2.1 2.1M8.6 15.4l-2.1 2.1m11-2.1-2.1-2.1M8.6 8.6 6.5 6.5",
];

export default function Differentials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Por que escolher a Imunisinos"
          title="Nossos diferenciais"
          description="Combinamos tradição familiar e experiência técnica para entregar tranquilidade ao seu dia a dia."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item, index) => (
            <div key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[index % ICONS.length]} />
                </svg>
              </span>
              <h3 className="mt-4 font-heading text-base font-bold text-secondary">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-secondary/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
