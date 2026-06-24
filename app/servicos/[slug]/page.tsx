import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import CTASection from "@/components/sections/CTASection";
import ServiceCard from "@/components/ServiceCard";
import { getServiceBySlug, services } from "@/lib/data/services";
import { CONTACT } from "@/lib/constants";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return { title: "Serviço não encontrado" };
  }
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-primary-light py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Link href="/servicos" className="font-body text-sm font-bold text-primary-dark hover:underline">
              ← Voltar para serviços
            </Link>
            <h1 className="mt-3 font-heading text-4xl font-bold text-secondary sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 font-body text-base text-secondary/80 sm:text-lg">
              {service.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT.whatsappUrlWithMessage(
                  `Olá! Gostaria de solicitar um orçamento para o serviço de ${service.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-8 py-3.5 text-center font-body text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Solicitar orçamento
              </a>
              <a
                href={CONTACT.phoneTel}
                className="rounded-full border-2 border-secondary px-8 py-3.5 text-center font-body text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-white"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
            <ImageWithFallback
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              fallbackLabel={service.title}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Destaques do serviço</h2>
            <ul className="mt-6 space-y-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 font-body text-sm text-secondary/80 sm:text-base">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-secondary">Como funciona</h2>
            <ol className="mt-6 space-y-4">
              {service.howItWorks.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-body text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="font-body text-sm text-secondary/80 sm:text-base">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-primary-light py-12">
        <div className="container-page rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-xl font-bold text-secondary">Para quem é indicado</h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base text-secondary/70">{service.idealFor}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-heading text-2xl font-bold text-secondary">Outros serviços</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <ServiceCard key={relatedService.slug} service={relatedService} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Quer agendar o serviço de ${service.title}?`}
        description="Fale com a nossa equipe e receba um orçamento sem compromisso."
      />
    </>
  );
}
