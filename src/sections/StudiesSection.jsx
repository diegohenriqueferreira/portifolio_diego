import SectionHeading from "../components/layout/SectionHeading";
import TimelineCard from "../components/cards/TimelineCard";

function StudiesSection({ studies }) {
  // Se não houver estudos no JSON, exibe uma mensagem de aviso
  if (!studies || studies.length === 0) {
    return (
      <section id="studies" className="section-shell perf-section scroll-mt-24">
        <SectionHeading eyebrow="Em estudo/aprendizado" />
        <p className="text-sm text-slate-400">Adicione seus estudos em src/data/studies.json</p>
      </section>
    );
  }

  return (
    <section id="studies" className="section-shell perf-section scroll-mt-24">
      <SectionHeading eyebrow="Próximos estudos/projetos" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {studies.map((item, index) => (
          <TimelineCard 
            key={item.id || index} 
            item={item} 
            index={index} 
            compact={true} 
          />
        ))}
      </div>
    </section>
  );
}

export default StudiesSection;