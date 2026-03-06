import SectionHeading from "../components/layout/SectionHeading";
import TimelineCard from "../components/cards/TimelineCard";

function TalksSection({ talks }) {
  return (
    <section id="talks" className="section-shell perf-section scroll-mt-24">
      {/* Mudei "Talks" para "Palestras" aqui embaixo */}
      <SectionHeading eyebrow="Palestras" />
      
      <div className="relative space-y-6 before:absolute before:left-2 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-accent/65 before:via-accentSoft/45 before:to-white/45 md:before:left-1/2 md:before:-translate-x-1/2">
        {talks.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default TalksSection;