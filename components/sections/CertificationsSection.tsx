import SectionHeading from "@/components/SectionHeading";
import CertificationBadge from "@/components/CertificationBadge";
import { certifications } from "@/lib/data/certifications";

export default function CertificationsSection() {
  return (
    <section className="bg-primary-light py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Conformidade e segurança"
          title="Certificações e licenças"
          description="Atuamos em conformidade com todas as normas técnicas, sanitárias, ambientais e de segurança do trabalho."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {certifications.map((certification) => (
            <CertificationBadge key={certification.title} certification={certification} />
          ))}
        </div>
      </div>
    </section>
  );
}
