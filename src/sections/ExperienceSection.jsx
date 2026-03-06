import SectionHeading from "../components/layout/SectionHeading";
import TimelineCard from "../components/cards/TimelineCard";

function ExperienceSection({ experience, compact = false }) {
  const sectionClassName = compact
    ? "perf-section scroll-mt-24 min-w-0"
    : "section-shell perf-section scroll-mt-24";
  const timelineClassName = compact
    ? "relative space-y-5 before:absolute before:left-2 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-accent/65 before:via-accentSoft/45 before:to-white/45"
    : "relative space-y-6 before:absolute before:left-2 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-accent/65 before:via-accentSoft/45 before:to-white/45 md:before:left-1/2 md:before:-translate-x-1/2";

  return (
    <section id="experience" className={sectionClassName}>
      <SectionHeading eyebrow="Experience" />
      <div className={timelineClassName}>
        {experience.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} compact={compact} />
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
