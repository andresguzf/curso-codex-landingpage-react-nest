import { coursesSchema } from '../schemas/course-schema';
import type { Course } from '../types/course';
import { z } from 'zod';

const defaultApiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const courseTagsSchema = z.array(z.string().min(1));
const countSchema = z.object({
  total: z.number().int().nonnegative(),
});

type FetchCoursesOptions = {
  query?: string;
  tag?: string;
};

export async function fetchCourses(options: FetchCoursesOptions = {}): Promise<Course[]> {
  const searchParams = new URLSearchParams();
  if (options.query) {
    searchParams.set('query', options.query);
  }
  if (options.tag && options.tag !== 'all') {
    searchParams.set('tag', options.tag);
  }

  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const response = await fetch(`${defaultApiBaseUrl}/courses${suffix}`);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el catalogo (${response.status})`);
  }

  const payload = await response.json();
  return coursesSchema.parse(payload);
}

export async function fetchLatestCourses(limit = 3): Promise<Course[]> {
  const response = await fetch(`${defaultApiBaseUrl}/courses/latest?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los ultimos cursos (${response.status})`);
  }

  const payload = await response.json();
  return coursesSchema.parse(payload);
}

export async function fetchCourseTags(): Promise<string[]> {
  const response = await fetch(`${defaultApiBaseUrl}/courses/tags`);

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los filtros (${response.status})`);
  }

  const payload = await response.json();
  return courseTagsSchema.parse(payload);
}

export async function fetchCoursesCount(): Promise<number> {
  const response = await fetch(`${defaultApiBaseUrl}/courses/count`);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el total de cursos (${response.status})`);
  }

  const payload = await response.json();
  return countSchema.parse(payload).total;
}
