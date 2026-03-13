import { z } from 'zod';

export const courseSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  duration: z.string().min(1),
  rating: z.number().min(0).max(5),
  price: z.number().int().nonnegative(),
  visual: z.string().min(1),
  best_sellers: z.boolean(),
  tags: z.array(z.string().min(1)).min(1),
});

export const createCourseSchema = courseSchema;
export const courseParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export const coursesQuerySchema = z.object({
  query: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
});
export const latestCoursesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(10).optional(),
});

export type CourseDto = z.infer<typeof courseSchema>;
export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export type CourseParamsDto = z.infer<typeof courseParamsSchema>;
export type CoursesQueryDto = z.infer<typeof coursesQuerySchema>;
export type LatestCoursesQueryDto = z.infer<typeof latestCoursesQuerySchema>;
