import type { Course } from '../../types/course';
import { LatestCoursesCarousel } from './LatestCoursesCarousel';

type LatestCoursesPanelProps = {
  courses: Course[];
  currentSlide: number;
  onChangeSlide: (index: number) => void;
  isLoading: boolean;
  error: string | null;
};

export function LatestCoursesPanel({ courses, currentSlide, onChangeSlide, isLoading, error }: LatestCoursesPanelProps) {
  return (
    <aside className="hero-stage" aria-label="Cursos recientes">
      <div className="latest-panel">
        <div className="latest-panel-header">
          <div>
            <span className="eyebrow">Lanzamientos</span>
            <h2>Ultimos cursos</h2>
          </div>
          {/* <p>Seleccion curada para quienes quieren avanzar rapido en stacks de alto impacto.</p> */}
        </div>
        {error ? <p className="catalog-empty">{error}</p> : null}
        {isLoading ? <p className="catalog-empty">Cargando ultimos cursos...</p> : null}
        {!isLoading && !error ? (
          <LatestCoursesCarousel courses={courses} currentSlide={currentSlide} onChangeSlide={onChangeSlide} />
        ) : null}
      </div>
    </aside>
  );
}
