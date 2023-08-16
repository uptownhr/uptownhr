import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { LovDb } from './lov-db';

export interface LovDbModuleConfig {
  databaseURL: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LovDbModuleConfig>().build();

@Module({
  controllers: [],
  providers: [LovDb],
  exports: [LovDb],
})
export class LovDbModule extends ConfigurableModuleClass {}
