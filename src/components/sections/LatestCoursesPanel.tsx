import type { Course } from '../../types/course';
import { LatestCoursesCarousel } from './LatestCoursesCarousel';

type LatestCoursesPanelProps = {
  courses: Course[];
  currentSlide: number;
  onChangeSlide: (index: number) => void;
};

export function LatestCoursesPanel({ courses, currentSlide, onChangeSlide }: LatestCoursesPanelProps) {
  return (
    <aside className="hero-stage" aria-label="Cursos recientes">
      <div className="latest-panel">
        <div className="latest-panel-header">
          <div>
            <span className="eyebrow">Lanzamientos</span>
            <h2>Ultimos cursos</h2>
          </div>
          <p>Seleccion curada para quienes quieren avanzar rapido en stacks de alto impacto.</p>
        </div>
        <LatestCoursesCarousel courses={courses} currentSlide={currentSlide} onChangeSlide={onChangeSlide} />
      </div>
    </aside>
  );
}
