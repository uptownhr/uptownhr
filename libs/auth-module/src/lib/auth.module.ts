import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './super-tokens.service';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
