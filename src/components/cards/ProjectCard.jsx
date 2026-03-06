import OptimizedImage from "../common/OptimizedImage";

function ProjectCard({ item }) {
  return (
    <article className="section-fade glass-card glass-hover flex h-full flex-col p-4 sm:p-5">
      <div className="overflow-hidden rounded-xl border border-white/20">
        <OptimizedImage
          src={item.image}
          alt={item.title}
          className="h-40 w-full object-cover sm:h-44"
          width={760}
          height={440}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
        />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {item.time || "In progress"}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
        {item.description || "Project details will be updated soon."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.github ? (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-slate-200 transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        ) : null}
        {item.website ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/55 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-accent transition hover:bg-accent hover:text-slate-950"
          >
            Acessar
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectCard;
