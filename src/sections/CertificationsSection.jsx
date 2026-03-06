import { useMemo, useState } from "react";
import CredentialCard from "../components/cards/CredentialCard";
import SectionHeading from "../components/layout/SectionHeading";

const CATEGORY_OPTIONS = [
  { id: "certificate", label: "Certificados" },
  { id: "badge", label: "Badges" }
];

const normalizeCategory = (value = "") => {
  const normalizedValue = String(value).toLowerCase();
  return normalizedValue.includes("badge") ? "badge" : "certificate";
};

function CertificationsSection({ certifications }) {
  const [activeCategory, setActiveCategory] = useState("certificate");

  const categorizedItems = useMemo(() => {
    return (certifications || []).map((item) => ({
      ...item,
      normalizedCategory: normalizeCategory(item.category)
    }));
  }, [certifications]);

  const filteredItems = useMemo(() => {
    return categorizedItems.filter((item) => item.normalizedCategory === activeCategory);
  }, [categorizedItems, activeCategory]);

  const badgeCount = categorizedItems.filter((item) => item.normalizedCategory === "badge").length;
  const certificateCount = categorizedItems.filter(
    (item) => item.normalizedCategory === "certificate"
  ).length;

  const isBadgeView = activeCategory === "badge";
  const gridClassName = isBadgeView
    ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid gap-5 sm:grid-cols-2 xl:grid-cols-4";

  return (
    /* MUDANÇA AQUI: id="certifications" para bater com o menu */
    <section id="certifications" className="section-shell perf-section scroll-mt-24">
      <SectionHeading eyebrow="Certificados" />

      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {CATEGORY_OPTIONS.map((option) => {
          const count = option.id === "badge" ? badgeCount : certificateCount;
          const isActive = option.id === activeCategory;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setActiveCategory(option.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
                isActive
                  ? "border-accent/70 bg-accent text-slate-950"
                  : "border-white/25 bg-white/[0.04] text-slate-200 hover:border-accent/55 hover:text-accent"
              }`}
            >
              {option.label} ({count})
            </button>
          );
        })}
      </div>

      {filteredItems.length ? (
        <div className={gridClassName}>
          {filteredItems.map((item) => (
            <CredentialCard key={item.id} item={item} variant={isBadgeView ? "badge" : "certificate"} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 text-center text-sm text-slate-300">
          Nenhum {isBadgeView ? "badge" : "certificado"} encontrado.
        </div>
      )}
    </section>
  );
}

export default CertificationsSection;