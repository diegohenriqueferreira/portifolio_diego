import OptimizedImage from "../common/OptimizedImage";

function CarouselCard({ item, type }) {
  const isProjectCard = type === "project";

  return (
    <article className="section-fade glass-card glass-hover flex h-full flex-col">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        className={`w-full object-cover opacity-95 ${isProjectCard ? "h-36 sm:h-40" : "h-44"}`}
        width={720}
        height={440}
        sizes="(min-width: 1024px) 35vw, (min-width: 640px) 58vw, 85vw"
      />
      <div className={`flex flex-1 flex-col ${isProjectCard ? "p-4" : "p-5"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.time}</p>
        <h3 className={`mt-2 font-display font-semibold text-ink ${isProjectCard ? "text-lg" : "text-xl"}`}>{item.title}</h3>
        <p className={`mt-2 flex-1 leading-relaxed text-slate-300 ${isProjectCard ? "text-xs" : "text-sm"}`}>{item.description}</p>
        <div className={`flex flex-wrap gap-2 ${isProjectCard ? "mt-3" : "mt-4"}`}>
          {item.github ? (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-200 transition hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          ) : null}
          {item.website ? (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-200 transition hover:border-accent hover:text-accent"
            >
              {type === "podcast" ? "Listen" : "Visit"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default CarouselCard;
