import ElevationCard from "../components/cards/ElevationCard";
import SectionHeading from "../components/layout/SectionHeading";

function EducationSection({ education, compact = false }) {
  const sectionClassName = compact
    ? "perf-section scroll-mt-24 min-w-0"
    : "section-shell perf-section scroll-mt-24";
  const gridClassName = compact
    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
    : "grid gap-5 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section id="education" className={sectionClassName}>
      <SectionHeading eyebrow="Educação" />
      <div className={gridClassName}>
        {education.map((item) => (
          <ElevationCard key={item.id} item={item} showCgpa />
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
