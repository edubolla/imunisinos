import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/lib/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem confia na Imunisinos"
          description="A satisfação de quem já contou com os nossos serviços."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
