import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/content.js';

export default function Header() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#hero">
          <img src="/logo-matchdeverdad.webp" alt="Logo de Matchdeverdad" width="40" height="40" />
          <span>
            Matchdeverdad
            <small>IFTS 29 · Grupo 21 · S07-A</small>
          </span>
        </a>
        <nav className="nav" aria-label="Navegación principal">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={active === href.slice(1) ? 'active' : undefined}
              aria-current={active === href.slice(1) ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
