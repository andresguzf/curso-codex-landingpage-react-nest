import { clockIcon } from '../../content/site-content';
import { formatHours, formatPrice, formatRating, getPrimaryTag } from '../../lib/course-utils';
import type { Course } from '../../types/course';
import { CourseVisual } from './CourseVisual';

type CourseCardProps = {
  course: Course;
  variant: 'catalog' | 'latest';
};

export function CourseCard({ course, variant }: CourseCardProps) {
  const isLatest = variant === 'latest';
  const wrapperClass = isLatest ? 'course-card' : 'market-card';
  const visualClass = isLatest ? 'course-visual' : 'market-visual';
  const bodyClass = isLatest ? 'course-body' : 'market-body';
  const footerClass = isLatest ? 'course-footer' : 'market-footer';

  return (
    <article className={wrapperClass}>
      <div className={visualClass}>
        <CourseVisual course={course} />
      </div>
      <div className={bodyClass}>
        <div className="course-badges">
          <span className="course-tag">{getPrimaryTag(course)}</span>
          {course.best_sellers ? <span className="course-bestseller-badge">Best seller</span> : null}
        </div>
        <h3>{course.title}</h3>
        <div className={isLatest ? 'course-meta' : 'market-meta'}>
          <span className="meta-stack">
            {clockIcon}
            {formatHours(course.hours)}
          </span>
          <span className="meta-rating">
            <span>{formatRating(course.rating)}</span>
            <span className="stars" style={{ ['--score' as string]: course.rating }} aria-label={`${formatRating(course.rating)} de 5 estrellas`} />
          </span>
        </div>
        <div className={footerClass}>
          <div className="market-price">{formatPrice(course.price)}</div>
          <a className="course-link" href="#contacto">
            Ver detalles
          </a>
        </div>
      </div>
    </article>
  );
}
