import OptimizedImage from "../common/OptimizedImage";

function TimelineCard({ item, index, compact = false }) {
  const isEven = index % 2 === 0;
  const articleClassName = compact
    ? "section-fade relative pl-8"
    : `section-fade relative md:w-1/2 ${isEven ? "md:pr-10" : "md:ml-auto md:pl-10"}`;
  const markerClassName = compact
    ? "absolute left-2 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-base bg-accent shadow-[0_0_14px_rgba(184,255,78,0.7)]"
    : `absolute top-8 hidden h-4 w-4 rounded-full border-4 border-base bg-accent shadow-[0_0_14px_rgba(184,255,78,0.7)] md:block ${
        isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      }`;

  return (
    <article className={articleClassName}>
      <span className={markerClassName} />
      <div className="glass-card glass-hover p-6">
        <OptimizedImage
          src={item.image}
          alt={item.title}
          className="h-36 w-full rounded-2xl border border-white/20 object-cover"
          width={760}
          height={420}
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.time}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
      </div>
    </article>
  );
}

export default TimelineCard;
