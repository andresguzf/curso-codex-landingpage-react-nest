import type { Course } from '../../types/course';
import { CourseCard } from '../courses/CourseCard';

type LatestCoursesCarouselProps = {
  courses: Course[];
  currentSlide: number;
  onChangeSlide: (index: number) => void;
};

export function LatestCoursesCarousel({ courses, currentSlide, onChangeSlide }: LatestCoursesCarouselProps) {
  if (courses.length === 0) {
    return null;
  }

  const previousSlide = currentSlide === 0 ? courses.length - 1 : currentSlide - 1;
  const nextSlide = currentSlide === courses.length - 1 ? 0 : currentSlide + 1;

  return (
    <div className="latest-courses">
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} variant="latest" />
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <div className="arrows is-visible">
          <button className="arrow" type="button" aria-label="Curso anterior" onClick={() => onChangeSlide(previousSlide)}>
            ‹
          </button>
          <button className="arrow" type="button" aria-label="Siguiente curso" onClick={() => onChangeSlide(nextSlide)}>
            ›
          </button>
        </div>
        <div className="dots" aria-label="Seleccion de cursos">
          {courses.map((course, index) => (
            <button
              key={course.id}
              className={`dot${index === currentSlide ? ' active' : ''}`}
              type="button"
              aria-label={`Ver curso ${index + 1}`}
              onClick={() => onChangeSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
