import type { Course } from '../types/course';

export const formatPrice = (price: number) => `USD ${price.toFixed(2)}`;
export const formatHours = (hours: number) =>
  `${Number.isInteger(hours) ? String(hours) : hours.toFixed(1)} horas`;
export const formatRating = (rating: number) => rating.toFixed(1);
export const getPrimaryTag = (course: Course) => (course.tags[0] ?? course.category).toUpperCase();
export const getCourseDetailHref = (course: Course) => `/cursos/${course.id}/${course.slug}`;

export const getResultsCopy = (filteredCount: number, query: string, activeTag: string) => {
  if (!query && activeTag === 'all') {
    return `Mostrando los ${filteredCount} cursos disponibles.`;
  }

  const queryText = query ? ` para "${query}"` : '';
  const tagText = activeTag !== 'all' ? ` en ${activeTag}` : '';
  return `${filteredCount} resultado(s)${queryText}${tagText}.`;
};
