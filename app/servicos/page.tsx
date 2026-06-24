import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/sections/CTASection";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça os serviços de controle de pragas da Imunisinos: CIP, cupins, sanitização, higienização de reservatórios, insetos e roedores.",
};

export default function ServicosPage() {
  return (
    <>
      <section className="bg-primary-light py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="O que fazemos"
            title="Nossos serviços"
            description="Soluções completas de controle de pragas e higienização para residências, empresas e indústrias no Vale dos Sinos, Vale do Paranhana e Serra Gaúcha."
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
