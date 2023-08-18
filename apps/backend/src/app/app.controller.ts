import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@uptownhr/auth-module';
import { LovDb } from '@uptownhr/lov-db';
import {
  AddAnswerInput,
  AddQuestionInput,
  Answer,
  CreatePageInput,
  Page,
  Question,
} from './app.model';
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

  @ApiResponse({ type: Question, status: 201 })
  @Post('question')
  async addQuestion(@Body() input: AddQuestionInput): Promise<Question> {
    const question = await this.lovDb.question.create({
      data: {
        title: input.title,
        page: {
          connect: {
            id: input.pageId,
          },
        },
      },
    });

    return {
      ...question,
      answerCount: 0,
      voteCount: 0,
    };
  }

  @ApiResponse({ type: Question, status: 200, isArray: true })
  @Get('page/:id/questions')
  async getPageQuestions(@Param('id') pageId: number): Promise<Question[]> {
    const questions = await this.lovDb.question.findMany({
      where: {
        pageId,
      },
      select: {
        id: true,
        title: true,
        votes: {
          select: {
            id: true,
          },
        },

        answers: {
          select: {
            id: true,
          },
        },
      },
    });

    return questions.map((q) => ({
      ...q,
      voteCount: q.votes.length,
      answerCount: q.answers.length,
    }));
  }

  @ApiResponse({ type: Answer, status: 201 })
  @Post('answer')
  async addAnswer(@Body() input: AddAnswerInput): Promise<Answer> {
    const answer = await this.lovDb.answer.create({
      data: {
        value: input.value,
        question: {
          connect: {
            id: input.questionId,
          },
        },
      },
    });

    return {
      ...answer,
      voteCount: 0,
    };
  }

  @ApiResponse({ type: Answer, status: 200, isArray: true })
  @Get('question/:id/answers')
  async getQuestionAnswers(@Param('id') questionId: number): Promise<Answer[]> {
    const answers = await this.lovDb.answer.findMany({
      where: {
        questionId,
      },

      include: {
        votes: true,
      },
    });

    return answers.map((a) => ({ ...a, voteCount: a.votes.length }));
  }
}
