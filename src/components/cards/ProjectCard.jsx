import OptimizedImage from "../common/OptimizedImage";

function ProjectCard({ item }) {
  // Função para garantir que o link do YouTube seja o link direto de visualização
  const getWatchUrl = (url) => {
    if (!url) return "#";
    // Se for link de embed, converte para link de visualização comum, ou vice-versa
    return url.replace("embed/", "watch?v=");
  };

  return (
    <article className="section-fade glass-card glass-hover flex h-full flex-col p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-xl border border-white/20 group">
        <OptimizedImage
          src={item.image}
          alt={item.title}
          className="h-40 w-full object-cover sm:h-44 transition-transform duration-500 group-hover:scale-105"
          width={760}
          height={440}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
        />

        {/* Link que envolve apenas a área da imagem se houver videoUrl */}
        {item.videoUrl && (
          <a
            href={getWatchUrl(item.videoUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
            title="Assistir demonstração no YouTube"
          >
            <div className="rounded-full bg-accent p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <svg className="h-6 w-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        )}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {item.time || "In progress"}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-white sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
        {item.description || "Project details will be updated soon."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-slate-200 transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        )}
        {item.website && (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/55 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-accent transition hover:bg-accent hover:text-slate-950"
          >
            Acessar
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;