import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@uptownhr/auth-module';
import { LovDb } from '@uptownhr/lov-db';
import { CreatePageInput, Page } from './app.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lovDb: LovDb
  ) {}

  @Get()
  @UseGuards(new AuthGuard())
  getData() {
    return this.appService.getData();
  }

  @Get('test')
  test() {
    return 'test';
  }

  @ApiResponse({ type: Page, status: 201 })
  @Post('page')
  async createPage(@Body() input: CreatePageInput): Promise<Page> {
    const page = await this.lovDb.page.create({
      data: {
        title: input.title,
        slug: input.title.toLowerCase().replaceAll(' ', '-'),
      },
    });

    return page;
  }

  @ApiResponse({ type: Page, status: 200, isArray: true })
  @Get('pages')
  async getPages(): Promise<Page[]> {
    const pages = await this.lovDb.page.findMany();

    return pages;
  }
}
