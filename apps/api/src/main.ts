import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { EnvironmentVariables } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.enableCors({
    origin: [configService.getOrThrow('CORS_ORIGIN', { infer: true })],
  });

  await app.listen(configService.getOrThrow('PORT', { infer: true }));
}

void bootstrap();
