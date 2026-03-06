import OptimizedImage from "../common/OptimizedImage";

function TimelineCard({ item, index, compact = false }) {
  const isEven = index % 2 === 0;

  // Ajustado: Removido o "pl-8" que dava espaço para a bolinha no modo compact
  const articleClassName = compact
    ? "section-fade relative" 
    : `section-fade relative md:w-1/2 ${isEven ? "md:pr-10" : "md:ml-auto md:pl-10"}`;

  return (
    <article className={articleClassName}>
      {/* A bolinha (markerClassName) foi removida daqui */}
      
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
        <p className="mt-3 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default TimelineCard;