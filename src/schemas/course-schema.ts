import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  duration: z.string().min(1),
  rating: z.number().min(0).max(5),
  price: z.number().nonnegative(),
  visual: z.string().min(1),
  latest: z.boolean(),
  tags: z.array(z.string().min(1)),
});

export const coursesSchema = z.array(courseSchema);
