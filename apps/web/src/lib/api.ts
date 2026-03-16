import { courseSchema, coursesSchema } from '../schemas/course-schema';
import { loginResponseSchema } from '../schemas/auth-schema';
import { ApiValidationError } from './api-errors';
import type { LoginCredentials, LoginResponse } from '../types/auth';
import type { CreateCourseInput } from '../types/course-form';
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

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${defaultApiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Credenciales invalidas' : `No se pudo iniciar sesion (${response.status})`);
  }

  const payload = await response.json();
  return loginResponseSchema.parse(payload);
}

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

export async function createCourse(input: CreateCourseInput, token: string): Promise<Course> {
  const response = await fetch(`${defaultApiBaseUrl}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const payload = await response.json().catch(() => null);
      const rawFieldErrors = payload?.issues?.fieldErrors as Record<string, string[] | undefined> | undefined;
      const fieldErrors = rawFieldErrors
        ? Object.fromEntries(
          Object.entries(rawFieldErrors)
            .map(([key, value]) => [key, value?.[0]])
            .filter((entry): entry is [string, string] => Boolean(entry[1])),
        )
        : {};

      throw new ApiValidationError(payload?.message ?? 'Error de validacion', fieldErrors);
    }

    throw new Error(response.status === 401 ? 'Tu sesion expiro. Vuelve a iniciar sesion.' : `No se pudo crear el curso (${response.status})`);
  }

  const payload = await response.json();
  return courseSchema.parse(payload);
}

export async function updateCourse(id: number, input: CreateCourseInput, token: string): Promise<Course> {
  const response = await fetch(`${defaultApiBaseUrl}/courses/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const payload = await response.json().catch(() => null);
      const rawFieldErrors = payload?.issues?.fieldErrors as Record<string, string[] | undefined> | undefined;
      const fieldErrors = rawFieldErrors
        ? Object.fromEntries(
          Object.entries(rawFieldErrors)
            .map(([key, value]) => [key, value?.[0]])
            .filter((entry): entry is [string, string] => Boolean(entry[1])),
        )
        : {};

      throw new ApiValidationError(payload?.message ?? 'Error de validacion', fieldErrors);
    }

    throw new Error(response.status === 401 ? 'Tu sesion expiro. Vuelve a iniciar sesion.' : `No se pudo actualizar el curso (${response.status})`);
  }

  const payload = await response.json();
  return courseSchema.parse(payload);
}

export async function deleteCourse(id: number, token: string): Promise<void> {
  const response = await fetch(`${defaultApiBaseUrl}/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Tu sesion expiro. Vuelve a iniciar sesion.' : `No se pudo eliminar el curso (${response.status})`);
  }
}
