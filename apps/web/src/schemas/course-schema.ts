import { z } from 'zod';

export const courseSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(10).max(120),
  category: z.string().min(1),
  description: z.string().min(1),
  hours: z.number().min(2).max(45),
  rating: z.number().min(0).max(5),
  price: z.number().nonnegative().min(7).max(100),
  best_sellers: z.boolean(),
  tags: z.array(z.string().min(1)),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const coursesSchema = z.array(courseSchema);
