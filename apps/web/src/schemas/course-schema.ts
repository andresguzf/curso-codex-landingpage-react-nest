import { z } from 'zod';

export const courseSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(10).max(120),
  category: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().url().nullable(),
  hours: z.number().min(2).max(45),
  rating: z.number().min(0).max(5),
  price: z.number().nonnegative().min(7).max(100),
  best_sellers: z.boolean(),
  tags: z.array(z.string().min(1)),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const coursesSchema = z.array(courseSchema);
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const paginatedCoursesSchema = z.object({
  items: coursesSchema,
  pagination: paginationMetaSchema,
});

export const createCourseInputSchema = z.object({
  slug: z.string().trim().min(1, 'El slug es obligatorio'),
  title: z.string().trim().min(10, 'El titulo debe tener al menos 10 caracteres').max(120),
  category: z.string().trim().min(1, 'La categoria es obligatoria'),
  description: z.string().trim().min(1, 'La descripcion es obligatoria'),
  image_url: z.string().url('La URL de imagen no es valida').nullable().optional(),
  hours: z.number().min(2, 'Las horas deben ser al menos 2').max(45, 'Las horas no pueden superar 45'),
  rating: z.number().min(0, 'El rating no puede ser negativo').max(5, 'El rating maximo es 5'),
  price: z.number().min(7, 'El precio minimo es 7 USD').max(100, 'El precio maximo es 100 USD'),
  best_sellers: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
});
