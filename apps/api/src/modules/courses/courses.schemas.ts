import { z } from 'zod';

const courseCreateFieldsSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(10).max(120),
  category: z.string().min(1),
  description: z.string().min(1),
  hours: z.number().min(2).max(45),
  rating: z.number().min(0).max(5),
  price: z.number().nonnegative().min(7).max(100),
  best_sellers: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
});

export const courseSchema = courseCreateFieldsSchema.extend({
  id: z.number().int().positive(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const createCourseSchema = courseCreateFieldsSchema;
export const updateCourseSchema = courseCreateFieldsSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  {
    message: 'At least one field is required',
  },
);
export const courseParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export const coursesQuerySchema = z.object({
  query: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
});
export const paginatedCoursesQuerySchema = coursesQuerySchema.extend({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
export const latestCoursesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(10).optional(),
});

export const paginatedCoursesSchema = z.object({
  items: z.array(courseSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
});

export type CourseDto = z.infer<typeof courseSchema>;
export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;
export type CourseParamsDto = z.infer<typeof courseParamsSchema>;
export type CoursesQueryDto = z.infer<typeof coursesQuerySchema>;
export type PaginatedCoursesQueryDto = z.infer<typeof paginatedCoursesQuerySchema>;
export type LatestCoursesQueryDto = z.infer<typeof latestCoursesQuerySchema>;
export type PaginatedCoursesDto = z.infer<typeof paginatedCoursesSchema>;
