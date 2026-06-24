import type { Testimonial } from "@/lib/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary/30" aria-hidden="true">
        <path d="M9.5 7C6.5 7 4 9.5 4 12.5V18h5.5v-5.5H7c0-1.4 1.1-2.5 2.5-2.5V7Zm9 0c-3 0-5.5 2.5-5.5 5.5V18H18.5v-5.5H16c0-1.4 1.1-2.5 2.5-2.5V7Z" />
      </svg>
      <blockquote className="mt-4 flex-1 font-body text-sm text-secondary/80 sm:text-base">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 font-heading text-sm font-bold text-secondary">
        {testimonial.author}
      </figcaption>
    </figure>
  );
}
