import type { ReactNode } from 'react';

export const courseDescriptions: Record<string, string> = {
  'Spring Boot': 'APIs robustas, estructura limpia y una base lista para crecer con buenas practicas.',
  'Apache Kafka': 'Mensajeria orientada a eventos para sistemas desacoplados y de alto trafico.',
  Python: 'Automatizacion y backend con foco en productividad, claridad y mantenimiento.',
  React: 'Interfaces modulares con mejor estructura visual, componentes reutilizables y criterio UX.',
  Angular: 'Arquitectura frontend para proyectos empresariales con equipos y flujos mas formales.',
  'Spring Cloud': 'Microservicios, resiliencia, discovery y contratos entre servicios con enfoque real.',
  Docker: 'Entornos repetibles para desarrollar, probar y desplegar sin friccion innecesaria.',
  Kubernetes: 'Orquestacion de contenedores con conceptos que sirven en equipos y plataformas reales.',
  PostgreSQL: 'Modelo relacional, consultas solidas y diseno de datos para aplicaciones exigentes.',
  Java: 'Fundamentos bien explicados para escribir backend orientado a objetos con criterio.',
  'Testing Java': 'JUnit y Mockito para elevar calidad, confianza y velocidad de iteracion.',
  AWS: 'Servicios cloud para desplegar y operar aplicaciones Java y Python con base practica.',
  'Node.js': 'Servicios web rapidos, APIs modernas y una base clara para backend con JavaScript.',
};

export const socialLinks: Array<{ href: string; label: string; icon: ReactNode }> = [
  {
    href: '#',
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4l6.2 7.9L4.4 20H7l4.4-5.3L15.5 20H20l-6.5-8.3L19.2 4h-2.6l-4 4.9L8.8 4z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 8.2c-.2-1-1-1.8-2-2C16.4 5.8 12 5.8 12 5.8s-4.4 0-6.2.4c-1 .2-1.8 1-2 2C3.4 10 3.4 12 3.4 12s0 2 .4 3.8c.2 1 1 1.8 2 2 1.8.4 6.2.4 6.2.4s4.4 0 6.2-.4c1-.2 1.8-1 2-2 .4-1.8.4-3.8.4-3.8s0-2-.4-3.8z" />
        <path d="M10.2 9.3l5 2.7-5 2.7z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Discord',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.2 6.8a14 14 0 0 0-3.5-1.1l-.2.4c1.1.3 2.1.8 3 1.4a10.7 10.7 0 0 0-6.9 0c.9-.6 1.9-1 3-1.4l-.2-.4a14 14 0 0 0-3.5 1.1C7.6 9 6.8 11.2 6.8 13.3c1.3 1 2.6 1.6 3.8 2l.9-1.4c-.5-.2-.9-.4-1.3-.7l.3-.2c2.5 1.1 5.2 1.1 7.6 0l.3.2c-.4.3-.8.5-1.3.7l.9 1.4c1.2-.4 2.5-1 3.8-2 0-2.5-.9-4.7-2.6-6.5zM10.1 12.7c-.7 0-1.2-.6-1.2-1.3s.5-1.3 1.2-1.3 1.2.6 1.2 1.3-.5 1.3-1.2 1.3zm3.8 0c-.7 0-1.2-.6-1.2-1.3s.5-1.3 1.2-1.3 1.2.6 1.2 1.3-.5 1.3-1.2 1.3z" />
      </svg>
    ),
  },
];

export const clockIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5l3 1.8" />
  </svg>
);
