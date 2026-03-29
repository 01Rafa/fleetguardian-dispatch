type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = ""
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slateBlue-700">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
