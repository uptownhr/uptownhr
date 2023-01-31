import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@uptownhr/auth-module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(new AuthGuard())
  getData() {
    return this.appService.getData();
  }

  @Get('test')
  test() {
    return 'test';
  }
}
