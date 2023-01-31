/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';

import { BackendModule } from './app/backend.module';
import { SupertokensExceptionFilter } from '@uptownhr/auth-module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration/configuration';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);
  const configService = app.get(ConfigService<Configuration, true>);

  const port = configService.get('port', { infer: true });

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
