import OptimizedImage from "../common/OptimizedImage";

function OverlayCard({ item, size = "default" }) {
  const compact = size === "compact";

  return (
    <article className="group section-fade glass-card glass-hover">
      <OptimizedImage
        src={item.image}
        alt={item.title}
        className={`w-full object-cover transition duration-500 group-hover:scale-105 ${compact ? "h-48 sm:h-52 lg:h-56" : "h-72"}`}
        width={980}
        height={720}
        sizes="(min-width: 1024px) 46vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-95 transition duration-300" />
      <div className={`absolute inset-x-0 bottom-0 translate-y-3 text-white transition duration-300 group-hover:translate-y-0 ${compact ? "p-4" : "p-5"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accentSoft">{item.time}</p>
        <h3 className={`mt-2 font-display font-semibold ${compact ? "text-lg" : "text-xl"}`}>{item.title}</h3>
        <p className={`mt-2 text-slate-100 ${compact ? "text-xs" : "text-sm"}`}>{item.description}</p>
      </div>
    </article>
  );
}

export default OverlayCard;
