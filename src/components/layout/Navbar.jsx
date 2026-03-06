import { useState } from "react";

function Navbar({ site, navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Garantia de que o menu não quebrará se os dados estiverem vazios
  const navItems = navigation || [];

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-slate-950/45 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#hero" className="font-display text-lg font-bold tracking-tight text-ink">
          {site?.name || "Portfolio"}
        </a>

        {/* Botão Mobile */}
        <button
          type="button"
          className="glass-subcard px-4 py-2 text-sm font-semibold text-slate-200 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? "Fechar" : "Menu"}
        </button>

        {/* Navegação Desktop */}
        <nav
          aria-label="Primary"
          className="carousel-scroll hidden max-w-[68vw] items-center gap-6 overflow-x-auto whitespace-nowrap md:flex"
        >
          {navItems.map((item) => (
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

      {/* Menu Mobile Aberto */}
      {isOpen ? (
        <nav aria-label="Mobile" className="section-shell flex flex-col gap-2 pb-6 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="glass-subcard px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/45 hover:text-accent"
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