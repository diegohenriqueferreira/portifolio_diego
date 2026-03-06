import ElevationCard from "../components/cards/ElevationCard";
import SectionHeading from "../components/layout/SectionHeading";

function AchievementsSection({ achievements }) {
  return (
    <section id="achievements" className="section-shell perf-section scroll-mt-24">
      <SectionHeading eyebrow="Achievements" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map((item) => (
          <ElevationCard key={item.id} item={item} enableImagePopup />
        ))}
      </div>
    </section>
  );
}

export default AchievementsSection;
