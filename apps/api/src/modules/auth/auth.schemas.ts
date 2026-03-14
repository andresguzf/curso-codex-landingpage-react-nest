import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .pipe(z.email()),
  password: z.string().min(8),
});

export const authUserSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const loginResponseSchema = z.object({
  access_token: z.string().min(1),
  user: authUserSchema,
});

export type LoginDto = z.infer<typeof loginSchema>;
export type AuthUserDto = z.infer<typeof authUserSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
