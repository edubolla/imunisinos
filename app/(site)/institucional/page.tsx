import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Differentials from "@/components/sections/Differentials";
import CertificationsSection from "@/components/sections/CertificationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function InstitucionalPage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Differentials />
      <CertificationsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
