import OptimizedImage from "../components/common/OptimizedImage";

function HeroSection({ hero, site }) {
  return (
    <section id="hero" className="section-shell section-fade scroll-mt-24 pb-8 pt-14 sm:pb-10 sm:pt-24 lg:pt-28">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
            {site.role}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="text-base font-semibold text-slate-300 sm:text-lg">{hero.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-950 shadow-[0_6px_18px_rgba(184,255,78,0.24)] transition hover:bg-accent/85"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-200 backdrop-blur-md transition hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{site.location}</p>
        </div>

        <div className="relative">
          <OptimizedImage
            src={hero.image}
            alt={hero.title}
            className="relative h-[22rem] w-full rounded-[1.75rem] border border-white/30 object-cover shadow-lift sm:h-[27rem]"
            width={920}
            height={1080}
            sizes="(min-width: 1024px) 35vw, 100vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
