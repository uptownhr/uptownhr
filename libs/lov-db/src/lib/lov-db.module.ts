import { Module } from '@nestjs/common';
import { LovDb } from './lov-db';
import { ConfigurableModuleClass } from './lov-db.configurable';

@Module({
  controllers: [],
  providers: [LovDb],
  exports: [LovDb],
})
export class LovDbModule extends ConfigurableModuleClass {}
