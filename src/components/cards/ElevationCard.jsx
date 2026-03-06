import { useEffect, useState } from "react";
import OptimizedImage from "../common/OptimizedImage";

function ElevationCard({ item, enableImagePopup = false, showCgpa = false }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const hasReferenceLink = Boolean(item.website);
  const cgpaValue = typeof item.cgpa === "string" && item.cgpa.trim() ? item.cgpa.trim() : "Concluído";
  const imageHeightClassName = showCgpa ? "h-36" : "h-40";
  const accentToken = {
    borderHover: "hover:border-accent/45",
    time: "text-accent",
    link: "border-accent/45 text-accent hover:bg-accent hover:text-white",
    imageBorder: "hover:border-accent/35"
  };

  useEffect(() => {
    if (!isPreviewOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPreviewOpen]);

  return (
    <>
      <article
        className={`group section-fade glass-card glass-hover p-6 ${accentToken.borderHover}`}
      >
        {enableImagePopup ? (
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className={`mb-5 block w-full overflow-hidden rounded-2xl border border-white/20 transition duration-300 ${accentToken.imageBorder}`}
            aria-label={`Open ${item.title} image`}
          >
            <OptimizedImage
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
              width={720}
              height={440}
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 47vw, 100vw"
            />
          </button>
        ) : (
          <OptimizedImage
            src={item.image}
            alt={item.title}
            className={`mb-5 w-full rounded-2xl border border-white/15 object-cover transition duration-500 group-hover:scale-[1.02] ${imageHeightClassName}`}
            width={720}
            height={420}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accentToken.time}`}>{item.time}</p>
          {showCgpa ? (
            <p className="inline-flex rounded-full border border-white/25 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#dce8fa]">
              Status: {cgpaValue}
            </p>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>

        {hasReferenceLink ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] transition ${accentToken.link}`}
          >
            {item.referenceLabel || "Reference"}
          </a>
        ) : null}
      </article>

      {enableImagePopup && isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-slate-950/90 p-3 pt-16 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} preview`}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <OptimizedImage
              src={item.image}
              alt={item.title}
              className="max-h-[76dvh] w-full rounded-2xl border border-slate-600 object-contain sm:max-h-[90vh]"
              width={1400}
              height={900}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ElevationCard;
