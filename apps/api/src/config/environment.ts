import * as Joi from 'joi';

export type EnvironmentVariables = {
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_FOLDER?: string;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  JWT_EXPIRES_IN: string;
  JWT_SECRET: string;
  PORT: number;
};

export const environmentValidationSchema = Joi.object<EnvironmentVariables>({
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  CORS_ORIGIN: Joi.string().default('http://localhost:5173'),
  CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
  CLOUDINARY_API_KEY: Joi.string().optional(),
  CLOUDINARY_API_SECRET: Joi.string().optional(),
  CLOUDINARY_FOLDER: Joi.string().default('codecimena/courses'),
});
