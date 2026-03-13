type InstructorSectionProps = {
  totalCourses: number;
};

export function InstructorSection({ totalCourses }: InstructorSectionProps) {
  return (
    <div className="hero-copy" id="sobre-mi">
      <span className="eyebrow">Arquitectura, backend y criterio tecnico</span>
      <h1>Software real, bien explicado.</h1>
      <p className="hero-lead">
        Programas pensados para desarrolladores que quieren dominar Java, Spring, microservicios, Kafka, cloud y frontend
        moderno con una mirada de produccion y equipo real.
      </p>

      <div className="hero-actions">
        <a className="primary-button" href="#cursos">
          Explorar cursos
        </a>
        <a className="secondary-button" href="#sobre-mi">
          Ver instructor
        </a>
      </div>

      <div className="hero-proof">
        <div className="proof-card">
          <span>Ruta guiada</span>
          <strong>Desde fundamentos hasta despliegue</strong>
        </div>
        <div className="proof-card">
          <span>Enfoque</span>
          <strong>Ejemplos reales, decisiones tecnicas y codigo limpio</strong>
        </div>
      </div>

      <div className="spotlight-card">
        <div className="spotlight-top">
          <span className="eyebrow">Instructor</span>
          <p>Backend, arquitectura y sistemas distribuidos</p>
        </div>

        <div className="spotlight-metrics" aria-label="Estadisticas del instructor">
          <div className="metric-block">
            <strong>18k+</strong>
            <span>Estudiantes</span>
          </div>
          <div className="metric-block">
            <strong>{totalCourses}</strong>
            <span>Cursos</span>
          </div>
          <div className="metric-block">
            <strong>4.9</strong>
            <span>Rating promedio</span>
          </div>
        </div>

        <p className="spotlight-quote">
          “Explicaciones directas, buena arquitectura y contenido que conecta con lo que se usa en equipos de software.”
        </p>
      </div>
    </div>
  );
}
