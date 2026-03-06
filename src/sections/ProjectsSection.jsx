import ProjectCard from "../components/cards/ProjectCard";
import SectionHeading from "../components/layout/SectionHeading";

function ProjectsSection({ projects }) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const gridClassName =
    safeProjects.length <= 1
      ? "mx-auto grid max-w-3xl gap-4"
      : safeProjects.length === 2
        ? "mx-auto grid max-w-4xl gap-4 sm:grid-cols-2"
        : "mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-3";

  return (
    <section id="projects" className="section-shell perf-section scroll-mt-24">
      <SectionHeading
        eyebrow="Projects"
        title=""
        description=""
      />

      {safeProjects.length ? (
        <div className={gridClassName}>
          {safeProjects.map((item, index) => (
            <ProjectCard key={`${item.id || "project"}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 text-sm text-slate-300">
          Projects will appear here once you add them in{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs">src/data/projects.json</code>.
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
