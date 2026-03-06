import ProjectCard from "../components/cards/ProjectCard";
import SectionHeading from "../components/layout/SectionHeading";

function ProjectsSection({ projects }) {
  const safeProjects = Array.isArray(projects) ? projects : [];

  // 1. Identifica as categorias únicas baseadas no campo "time"
  const categories = [...new Set(safeProjects.map((p) => p.time))];

  return (
    <section id="projects" className="section-shell perf-section scroll-mt-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Meus Projetos"
        description="Explorando soluções em Engenharia, Excel e Inteligência de Dados."
      />

      {safeProjects.length ? (
        <div className="mx-auto max-w-6xl space-y-12">
          {categories.map((category) => (
            <div key={category} className="category-group">
              {/* Subtítulo da Categoria com estilo */}
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-2xl font-bold text-white whitespace-nowrap">
                  {category}
                </h3>
                <div className="h-[1px] w-full bg-white/10"></div>
              </div>

              {/* Grid de Projetos Filtrados */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {safeProjects
                  .filter((item) => item.time === category)
                  .map((item, index) => (
                    <ProjectCard 
                      key={`${item.id || "project"}-${index}`} 
                      item={item} 
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 text-sm text-slate-300">
          Projects will appear here once you add them in{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs">
            src/data/projects.json
          </code>.
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;