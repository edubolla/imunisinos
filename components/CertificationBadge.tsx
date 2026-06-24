import type { Certification } from "@/lib/data/certifications";

export default function CertificationBadge({ certification }: { certification: Certification }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3 4.5 5.5v6c0 4.5 3.2 7.6 7.5 9.5 4.3-1.9 7.5-5 7.5-9.5v-6L12 3Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.5 2 2 4-4.5" />
        </svg>
      </span>
      <h3 className="font-heading text-base font-bold text-secondary">{certification.title}</h3>
      <p className="font-body text-sm text-secondary/70">{certification.description}</p>
    </div>
  );
}
