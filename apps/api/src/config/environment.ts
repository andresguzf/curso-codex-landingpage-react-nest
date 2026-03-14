import * as Joi from 'joi';

export type EnvironmentVariables = {
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
});
