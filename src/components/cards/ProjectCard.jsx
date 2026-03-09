import { useState } from "react";
import OptimizedImage from "../common/OptimizedImage";

function ProjectCard({ item }) {
  const [showVideo, setShowVideo] = useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <>
      <article className="section-fade glass-card glass-hover flex h-full flex-col p-4 sm:p-5 relative">
        <div className="relative overflow-hidden rounded-xl border border-white/20 group">
          <OptimizedImage
            src={item.image}
            alt={item.title}
            className="h-40 w-full object-cover sm:h-44 transition-transform duration-500 group-hover:scale-105"
            width={760}
            height={440}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
          />

          {item.videoUrl && (
            <div 
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div className="rounded-full bg-accent p-3 shadow-lg">
                <svg className="h-6 w-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
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

      {/* MODAL DO PLAYER */}
      {showVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden border border-white/10">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-accent hover:text-slate-950 transition-all"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* LINHA CORRIGIDA ABAIXO (strokeWidth="2") */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <iframe
              src={getEmbedUrl(item.videoUrl)}
              className="h-full w-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;