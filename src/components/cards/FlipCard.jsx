import { useState } from "react";
import OptimizedImage from "../common/OptimizedImage";

function FlipCard({ item, frontLabel = "Card", imageVariant = "landscape" }) {
  const [flipped, setFlipped] = useState(false);
  const isBadge = imageVariant === "portrait";
  const frontImageClassName = isBadge
    ? "aspect-[3/4] w-full object-contain bg-slate-950/45 p-3 opacity-95"
    : "h-44 w-full object-cover opacity-95";
  const minHeightStyle = isBadge ? { minHeight: "28rem" } : undefined;

  return (
    <article
      className={`flip-card section-fade cursor-pointer ${flipped ? "is-flipped" : ""}`}
      style={minHeightStyle}
      onClick={() => setFlipped((current) => !current)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((current) => !current);
        }
      }}
      aria-label={`${item.title} details`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face !absolute glass-card">
          <OptimizedImage
            src={item.image}
            alt={item.title}
            className={frontImageClassName}
            width={isBadge ? 540 : 720}
            height={isBadge ? 720 : 420}
            sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 100vw"
          />
          <div className="space-y-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{frontLabel}</p>
            <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
          </div>
        </div>

        <div className="flip-card-face flip-card-back !absolute glass-card bg-gradient-to-br from-slate-900/80 to-base/90 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accentSoft">{item.time}</p>
          <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-100">{item.description}</p>
        </div>
      </div>
    </article>
  );
}

export default FlipCard;
