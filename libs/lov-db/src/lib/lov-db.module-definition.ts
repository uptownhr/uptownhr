import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface LovDbModuleConfig {
  databaseURL: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LovDbModuleConfig>().build();
