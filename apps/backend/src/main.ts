/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';

import { AppModule } from './app/app.module';
import { SupertokensExceptionFilter } from '@uptownhr/auth-module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration, true>);

  const port = configService.get('port', { infer: true });

  app.enableCors({
    origin: ['localhost:3000'],
    allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
