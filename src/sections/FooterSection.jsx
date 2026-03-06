function FooterSection({ footer }) {
  const email = footer.email || "hello@averystone.dev";
  const officeLocation = footer.officeLocation || "Austin, Texas";
  const phone = footer.phone || "+1 (512) 555-0184";

  return (
    <footer
      id="footer"
      className="perf-section mt-10 border-t border-white/20 bg-slate-950/55 pb-4 pt-5 backdrop-blur-xl"
    >
      <div className="section-shell grid gap-3 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <h2 className="mt-1 font-display text-xl font-bold text-ink">{footer.title}</h2>
          <p className="text-xs text-slate-400">{footer.description}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="glass-subcard px-3 py-2 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Email</p>
            <p className="mt-1 text-slate-200">{email}</p>
          </div>

          <div className="glass-subcard px-3 py-2 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Local</p>
            <p className="mt-1 text-slate-200">{officeLocation}</p>
          </div>

          <div className="glass-subcard px-3 py-2 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Telefone</p>
            <p className="mt-1 text-slate-200">{phone}</p>
          </div>
        </div>
      </div>

      <p className="section-shell mt-3 text-center text-[10px] text-slate-500">
        {footer.time} {footer.title}. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterSection;
