import OptimizedImage from "../common/OptimizedImage";

function BlogFinderCard({ item, onPreview }) {
  return (
    <article className="section-fade glass-card glass-hover flex h-full flex-col p-4 sm:p-5">
      <button
        type="button"
        onClick={() => onPreview(item)}
        className="group/image relative block overflow-hidden rounded-xl border border-white/20"
        aria-label={`Preview image for ${item.title}`}
      >
        <OptimizedImage
          src={item.image}
          alt={item.title}
          className="h-44 w-full object-cover transition duration-500 group-hover/image:scale-105"
          width={760}
          height={440}
          sizes="(min-width: 1280px) 31vw, (min-width: 640px) 50vw, 100vw"
        />
      </button>

      <div className="mt-4 flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{item.time}</p>
        <span className="rounded-full border border-white/20 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#dce8fa]">
          {item.category}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-ink">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{item.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPreview(item)}
          className="rounded-full border border-white/30 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-100 transition hover:border-accent/70 hover:text-accent"
        >
          Preview
        </button>
        {item.website ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/50 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-accent hover:text-slate-950"
          >
            Read Blog
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default BlogFinderCard;
