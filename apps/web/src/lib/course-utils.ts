import { courseDescriptions } from '../content/site-content';
import type { Course } from '../types/course';

export const formatPrice = (price: number) => `USD ${price}`;
export const formatRating = (rating: number) => rating.toFixed(1);
export const getDescription = (course: Course) =>
  courseDescriptions[course.category] ?? 'Contenido orientado a proyectos, criterio tecnico y fundamentos que si escalan.';
export const getPrimaryTag = (course: Course) => (course.tags[0] ?? course.category).toUpperCase();

export const getResultsCopy = (filteredCount: number, query: string, activeTag: string) => {
  if (!query && activeTag === 'all') {
    return `Mostrando los ${filteredCount} cursos disponibles.`;
  }

  const queryText = query ? ` para "${query}"` : '';
  const tagText = activeTag !== 'all' ? ` en ${activeTag}` : '';
  return `${filteredCount} resultado(s)${queryText}${tagText}.`;
};
