import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@uptownhr/auth-module';
import { LovDb } from '@uptownhr/lov-db';
import {
  AddAnswerInput,
  AddQuestionInput,
  Answer,
  CreatePageInput,
  Page,
  PageWithQuestions,
  Question,
} from './app.model';
import { ApiResponse } from '@nestjs/swagger';

import { firefox } from 'playwright';
import { Page as PlayPage } from 'playwright';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lovDb: LovDb,
  ) {}

  @Get('health')
  async health() {
    const test = await this.lovDb.$queryRaw`SELECT 1`;

    return {
      status: !!test,
    };
  }

  @Get()
  @UseGuards(new AuthGuard())
  getData() {
    return this.appService.getData();
  }

  @Get('test')
  test() {
    return 'test';
  }

  @Get('play')
  async play(@Query('url') url: string) {
    if (!url) {
      throw new HttpException('url is required', 400);
    }

    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.waitForTimeout(4000);

    async function getRedfinPropertyValueFromPage(page: PlayPage) {
      const scriptEls = await page.$$('script[type="application/ld+json"]');
      const elTexts = await Promise.all(
        scriptEls.map(async (el) => {
          const text = await el.innerText();
          console.log('text', text);
          try {
            const json = JSON.parse(text);

            return json;
          } catch (e) {
            return;
          }
        }),
      );

      console.log('elTexts', elTexts);

      const sfrPropertyEl = elTexts
        .filter((el) => el)
        .find((el) => {
          const type = el['@type'];

          return type?.[0] === 'Product';
        });

      return sfrPropertyEl.offers.price;
    }

    const price = await getRedfinPropertyValueFromPage(page);

    return price;
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
      include: {
        answers: true,
      },
    });

    return {
      ...question,
      voteCount: 0,
    };
  }

  @ApiResponse({ type: Page, status: 200 })
  @Get('page/:id')
  async getPage(id: number): Promise<Page> {
    const page = await this.lovDb.page.findUnique({
      where: {
        id,
      },
    });

    if (!page) {
      throw new HttpException('Page not found', 404);
    }

    return page;
  }

  @ApiResponse({ type: PageWithQuestions, status: 200 })
  @Get('page/:id/questions')
  async getPageQuestions(
    @Param('id', ParseIntPipe) pageId: number,
  ): Promise<PageWithQuestions> {
    const page = await this.lovDb.page.findUnique({
      where: {
        id: pageId,
      },

      include: {
        questions: {
          include: {
            votes: {
              select: {
                id: true,
              },
            },
            answers: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
      },
    });

    if (!page) {
      throw new HttpException('Page not found', 404);
    }

    const mappedQuestions = page.questions.map((q) => ({
      ...q,
      voteCount: q.votes.length,
      answerCount: q.answers.length,
    }));

    return {
      ...page,
      questions: mappedQuestions,
    };
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

    return answer;
  }

  @ApiResponse({ type: Answer, status: 200, isArray: true })
  @Get('question/:id/answers')
  async getQuestionAnswers(
    @Param('id', ParseIntPipe) questionId: number,
  ): Promise<Answer[]> {
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

  @ApiResponse({ type: Question, status: 200 })
  @Post('question/:id/vote')
  async questionVote(@Param('id') id: number): Promise<Question> {
    console.log('id', id);
    const vote = await this.lovDb.questionVote.create({
      data: {
        question: {
          connect: {
            id,
          },
        },
      },
      include: {
        question: {
          include: {
            votes: true,
            answers: true,
          },
        },
      },
    });

    return {
      ...vote.question,
      voteCount: vote.question.votes.length,
    };
  }

  @ApiResponse({ type: Answer, status: 200 })
  @Post('answer/:id/vote')
  async answerVote(@Param('id') id: number): Promise<Answer> {
    const vote = await this.lovDb.answerVote.create({
      data: {
        answer: {
          connect: {
            id,
          },
        },
      },
      include: {
        answer: {
          include: {
            votes: true,
          },
        },
      },
    });

    return {
      ...vote.answer,
      //      voteCount: vote.answer.votes.length,
    };
  }
}
