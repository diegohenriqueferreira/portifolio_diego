import SectionHeading from "../components/layout/SectionHeading";
import OptimizedImage from "../components/common/OptimizedImage";

const DEFAULT_ABOUT_META = {
  intro:
    "I focus on building reliable interfaces that feel fast, accessible, and distinctly human. My work blends product thinking with clean engineering execution.",
  cvLabel: "Download CV",
  cvUrl: "#"
};

function AboutSection({ aboutMeta, contactSocials }) {
  const meta = { ...DEFAULT_ABOUT_META, ...(aboutMeta || {}) };
  const socials = Array.isArray(contactSocials) ? contactSocials : [];

  return (
    <section id="about" className="section-shell perf-section scroll-mt-24">
      <SectionHeading eyebrow="SOBRE" />

      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.03] p-5 backdrop-blur-md sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(184,255,78,0.16),transparent_45%),radial-gradient(circle_at_15%_85%,rgba(126,166,199,0.18),transparent_48%)]" />
        <div className="relative">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-accent/85">
            RESUMO
          </p>
          <p className="about-intro-text mt-3 max-w-6xl text-sm leading-relaxed sm:text-base lg:text-lg">
            {meta.intro}
          </p>

          <div className="mt-7 flex justify-center sm:justify-start">
            <a
              href={meta.cvUrl}
              className="inline-flex rounded-full border border-accent/50 bg-white/5 px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-accent backdrop-blur-md transition hover:bg-accent hover:text-slate-950"
              download
            >
              {meta.cvLabel}
            </a>
          </div>
        </div>
      </div>

      {socials.length ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              title={item.title}
              className="group section-fade flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-white/[0.1] hover:shadow-[0_12px_30px_rgba(184,255,78,0.2)] active:scale-95"
            >
              <OptimizedImage
                src={item.iconPath || item.image}
                alt={item.title}
                className="h-8 w-8 object-contain opacity-95 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
                width={32}
                height={32}
                sizes="32px"
              />
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default AboutSection;
