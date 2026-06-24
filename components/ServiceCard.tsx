import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { Service } from "@/lib/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicos/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ImageWithFallback
          src={service.image}
          alt={service.imageAlt}
          fill
          fallbackLabel={service.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold text-secondary">{service.title}</h3>
        <p className="mt-2 flex-1 font-body text-sm text-secondary/70">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-bold text-primary">
          Saiba mais
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
