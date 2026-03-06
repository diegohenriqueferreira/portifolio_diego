import FlipCard from "../components/cards/FlipCard";
import SectionHeading from "../components/layout/SectionHeading";

function ServicesSection({ services }) {
  return (
    <section id="services" className="section-shell perf-section scroll-mt-24">
      <SectionHeading
        eyebrow="Services"
        title="Interactive service cards"
        description="Flip cards reveal project timelines and approach details."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((item) => (
          <FlipCard key={item.id} item={item} frontLabel="Service" />
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
