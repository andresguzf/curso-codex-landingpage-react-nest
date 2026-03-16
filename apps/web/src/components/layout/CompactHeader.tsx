import { Link } from 'react-router-dom';

type CompactHeaderProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};

export function CompactHeader({ isLightTheme, onToggleTheme, action }: CompactHeaderProps) {
  return (
    <header className="site-header compact-header">
      <div className="compact-bar">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <defs>
                <linearGradient id="compactBrandGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5c46b" />
                  <stop offset="100%" stopColor="#ff7a59" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="34" height="34" rx="12" fill="url(#compactBrandGlow)" />
              <path d="M13 26V14h3.2l4.8 6.2V14H26v12h-3.1l-5-6.4V26z" fill="#1a1612" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>Andres Guzman</strong>
            <span>CodeCinema Academy</span>
          </span>
        </Link>

        <div className="nav-actions">
          {action ? (
            action.href ? (
              <Link className="secondary-button" to={action.href}>
                {action.label}
              </Link>
            ) : (
              <button className="secondary-button compact-action-button" type="button" onClick={action.onClick}>
                {action.label}
              </button>
            )
          ) : null}

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
      </div>
    </header>
  );
}
