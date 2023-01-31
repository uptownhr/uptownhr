import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AuthModuleConfig } from './config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthModuleConfig>().build();
