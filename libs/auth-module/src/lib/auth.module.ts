import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './super-tokens.service';
import { ConfigurableModuleClass } from './auth.module-definition';

@Module({
  providers: [SupertokensService],
  exports: [SupertokensService],
})
export class AuthModule extends ConfigurableModuleClass {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
