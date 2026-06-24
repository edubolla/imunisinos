import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data/services";

export default function ServicesOverview() {
  return (
    <section className="bg-primary-light py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Nossos serviços"
          description="Soluções completas em controle de pragas para residências, empresas e indústrias."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-secondary/85"
          >
            Ver todos os serviços
          </Link>
        </div>
      </div>
    </section>
  );
}
