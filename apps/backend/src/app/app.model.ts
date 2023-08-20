import { ApiProperty } from '@nestjs/swagger';

export class CreatePageInput {
  @ApiProperty()
  title: string;
}

export class AddQuestionInput {
  @ApiProperty()
  title: string;

  @ApiProperty()
  pageId: number;
}
export class Question {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  answerCount: number;

  @ApiProperty()
  voteCount: number;
}

export class Page {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PageWithQuestions extends Page {
  @ApiProperty({ type: Question, isArray: true })
  questions: Question[];
}

export class AddAnswerInput {
  @ApiProperty()
  value: string;

  @ApiProperty()
  questionId: number;
}

export class Answer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: string;

  @ApiProperty()
  voteCount: number;
}
