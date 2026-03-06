import { useState } from "react";

function Navbar({ site, navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-slate-950/45 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#hero" className="font-display text-lg font-bold tracking-tight text-ink">
          {site.name}
        </a>

        <button
          type="button"
          className="glass-subcard px-3 py-2 text-sm font-semibold text-slate-200 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav
          aria-label="Primary"
          className="carousel-scroll hidden max-w-[68vw] items-center gap-4 overflow-x-auto whitespace-nowrap md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-semibold text-slate-300 transition hover:text-accent lg:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <nav aria-label="Mobile" className="section-shell flex flex-col gap-1 pb-4 md:hidden">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="glass-subcard px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-accent/45 hover:text-accent"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export default Navbar;
