import type { Course } from '../../types/course';
import { CourseCard } from './CourseCard';

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="catalog-grid" aria-label="Catalogo de cursos">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} variant="catalog" />
      ))}
    </div>
  );
}
