import { useMemo, useState } from "react";
import SkillClusterCard from "../components/cards/SkillClusterCard";
import SectionHeading from "../components/layout/SectionHeading";

const DEFAULT_SKILLS = {
  headline:
    "Core skills I use in real project work across machine learning, backend systems, frontend, and tooling.",
  previewCountPerCategory: 3,
  categories: []
};

function SkillsSection({ skills }) {
  const [showAll, setShowAll] = useState(false);
  const safeSkills = { ...DEFAULT_SKILLS, ...(skills || {}) };
  const previewCountPerCategory = Number.isFinite(safeSkills.previewCountPerCategory)
    ? Math.max(1, safeSkills.previewCountPerCategory)
    : DEFAULT_SKILLS.previewCountPerCategory;

  const normalizedCategories = useMemo(() => {
    if (!Array.isArray(safeSkills.categories)) {
      return [];
    }

    return safeSkills.categories
      .map((category) => {
        const rawItems = Array.isArray(category?.items) ? category.items : [];
        const sortedItems = [...rawItems].sort((left, right) => {
          const leftOrder = Number.isFinite(left?.order) ? left.order : Number.MAX_SAFE_INTEGER;
          const rightOrder = Number.isFinite(right?.order) ? right.order : Number.MAX_SAFE_INTEGER;
          return leftOrder - rightOrder || (left?.name || "").localeCompare(right?.name || "");
        });

        const featuredItems = sortedItems.filter((item) => item?.featured !== false);
        const previewItems = (featuredItems.length ? featuredItems : sortedItems).slice(0, previewCountPerCategory);
        const visibleItems = showAll ? sortedItems : previewItems;

        return {
          ...category,
          items: visibleItems,
          totalCount: sortedItems.length
        };
      })
      .filter((category) => Array.isArray(category.items) && category.items.length);
  }, [safeSkills.categories, showAll, previewCountPerCategory]);

  const hiddenSkillsCount = useMemo(() => {
    if (showAll) {
      return 0;
    }

    return normalizedCategories.reduce((total, category) => total + Math.max(0, category.totalCount - category.items.length), 0);
  }, [normalizedCategories, showAll]);

  return (
    <section id="skills" className="section-shell perf-section scroll-mt-24">
      <SectionHeading eyebrow="Skills" description={safeSkills.headline} />

      {normalizedCategories.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {normalizedCategories.map((category) => (
              <SkillClusterCard key={category.id || category.title} category={category} />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="rounded-full border border-white/30 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-accent/55 hover:text-accent"
            >
              {showAll ? "Show Core Skills" : hiddenSkillsCount > 0 ? `View All Skills (+${hiddenSkillsCount})` : "View All Skills"}
            </button>
          </div>
        </>
      ) : (
        <div className="glass-card p-6 text-sm text-slate-300">
          Add your categories under{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">skills.categories</code> in{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/data/skills.json</code>.
        </div>
      )}
    </section>
  );
}

export default SkillsSection;
