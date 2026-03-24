import { Link } from 'react-router-dom';
import { clockIcon } from '../../content/site-content';
import { formatHours, formatPrice, formatRating, getCourseDetailHref, getPrimaryTag } from '../../lib/course-utils';
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
  const detailHref = getCourseDetailHref(course);

  return (
    <article className={wrapperClass}>
      <Link className={`${visualClass} course-visual-link`} to={detailHref} aria-label={`Abrir detalle del curso ${course.title}`}>
        <CourseVisual course={course} />
      </Link>
      <div className={bodyClass}>
        <div className="course-badges">
          <span className="course-tag">{getPrimaryTag(course)}</span>
          {course.best_sellers ? <span className="course-bestseller-badge">Best seller</span> : null}
        </div>
        <h3>{course.title}</h3>
        {/* <p className={isLatest ? 'course-description' : 'market-description'}>{course.description}</p> */}
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
          <Link className="course-link" to={detailHref}>
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
