function SectionHeading({ eyebrow, title, description }) {
  const semanticHeading = title || eyebrow;

  return (
    <div className="mb-8 max-w-2xl space-y-3 sm:mb-10">
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2> : null}
      {!title && semanticHeading ? <h2 className="sr-only">{semanticHeading}</h2> : null}
      {description ? (
        <p className="about-subtext text-sm leading-relaxed sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
