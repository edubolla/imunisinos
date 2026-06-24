type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <span className="font-body text-sm font-bold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl font-bold text-secondary sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 font-body text-base text-secondary/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
