/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';

import { AppModule } from './app/app.module';
import { SupertokensExceptionFilter } from '@uptownhr/auth-module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration, true>);

  const port = configService.get('port', { infer: true });
  const websiteDomain = configService.get('supertokens.websiteDomain', {
    infer: true,
  });

  app.enableCors({
    origin: [websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Questions and Answers')
    .setDescription('The Q&A API')
    .setVersion('1.0')
    .addTag('questions-and-answers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(availableRoutes);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
