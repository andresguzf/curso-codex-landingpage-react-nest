import type { Course } from '../types/course';
import type { PaginationMeta } from '../types/pagination';
import type { AuthUser } from '../types/auth';

export const adminUser: AuthUser = {
  id: 1,
  email: 'admin@example.com',
  created_at: '2026-03-16T10:00:00.000Z',
  updated_at: '2026-03-16T10:00:00.000Z',
};

export const baseCourse: Course = {
  id: 1,
  slug: 'react-avanzado',
  title: 'Curso de React Avanzado',
  category: 'Frontend',
  description: 'Un curso para profundizar en React.',
  image_url: null,
  hours: 12.5,
  rating: 4.8,
  price: 39.9,
  best_sellers: true,
  tags: ['react', 'frontend'],
  created_at: '2026-03-16T10:00:00.000Z',
  updated_at: '2026-03-16T10:00:00.000Z',
};

export const secondCourse: Course = {
  ...baseCourse,
  id: 2,
  slug: 'nestjs-api',
  title: 'Curso de NestJS API',
  category: 'Backend',
  best_sellers: false,
  tags: ['nestjs'],
};

export const defaultPagination: PaginationMeta = {
  page: 1,
  limit: 8,
  total: 2,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};
