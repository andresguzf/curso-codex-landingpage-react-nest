import { socialLinks } from '../../content/site-content';

export function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-copy">
        <span className="eyebrow">Contacto</span>
        <p>CodeCinema Academy © 2026. Cursos online de desarrollo, arquitectura y sistemas distribuidos.</p>
        <a className="footer-email" href="mailto:contacto@andresguzman.dev">
          contacto@andresguzman.dev
        </a>
      </div>

      <div className="social-links" aria-label="Redes sociales">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} aria-label={link.label}>
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
