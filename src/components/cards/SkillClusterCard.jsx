function SkillClusterCard({ category }) {
  const skills = Array.isArray(category?.items) ? category.items : [];
  const totalCount = Number.isFinite(category?.totalCount) ? category.totalCount : skills.length;
  const isCondensed = totalCount > skills.length;

  return (
    <article className="section-fade glass-subcard p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{category.title}</h3>
        <span className="rounded-full border border-white/20 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
          {isCondensed ? `${skills.length}/${totalCount}` : totalCount}
        </span>
      </div>

      <ul className="grid gap-2">
        {skills.map((skill) => (
          <li key={skill.id || skill.name} className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5">
            <p className="text-sm font-medium text-slate-100">{skill.name}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default SkillClusterCard;
