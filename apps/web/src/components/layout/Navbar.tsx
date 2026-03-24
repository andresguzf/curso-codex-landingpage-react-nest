import { useLocation } from 'react-router-dom';

type NavbarProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
};

export function Navbar({ isLightTheme, onToggleTheme }: NavbarProps) {
  const { pathname } = useLocation();
  const getSectionHref = (sectionId: string) => (pathname === '/' ? `#${sectionId}` : `/#${sectionId}`);

  return (
    <nav className="navbar" aria-label="Principal">
      <a className="brand" href={getSectionHref('inicio')}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <defs>
              <linearGradient id="brandGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5c46b" />
                <stop offset="100%" stopColor="#ff7a59" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="34" height="34" rx="12" fill="url(#brandGlow)" />
            <path d="M13 26V14h3.2l4.8 6.2V14H26v12h-3.1l-5-6.4V26z" fill="#1a1612" />
          </svg>
        </span>
        <span className="brand-copy">
          <strong>Andres Guzman</strong>
          <span>Dev Academy</span>
        </span>
      </a>

      <ul className="nav-links">
        <li>
          <a href={getSectionHref('inicio')}>Inicio</a>
        </li>
        <li>
          <a href={getSectionHref('sobre-mi')}>Instructor</a>
        </li>
        <li>
          <a href={getSectionHref('cursos')}>Cursos</a>
        </li>
        <li>
          <a href={getSectionHref('contacto')}>Contacto</a>
        </li>
      </ul>

      <div className="nav-actions">
        <a className="nav-cta" href={getSectionHref('cursos')}>
          Ver catalogo
        </a>
        <button
          className="theme-switch"
          type="button"
          aria-label="Cambiar entre tema oscuro y claro"
          aria-pressed={isLightTheme}
          onClick={onToggleTheme}
        >
          <span className="theme-switch-track">
            <span className="theme-switch-icon moon" aria-hidden="true">
              ☾
            </span>
            <span className="theme-switch-thumb" />
            <span className="theme-switch-icon sun" aria-hidden="true">
              ☼
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
}
