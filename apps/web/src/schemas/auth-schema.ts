import { z } from 'zod';

export const loginCredentialsSchema = z.object({
  email: z.email('Ingresa un email valido').trim().toLowerCase(),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres'),
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
