export type QuestionType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'array'
  | 'object'
  | 'email';

export class QuestionOption {
  type: QuestionType;
  label: string;
  value: string;
}

export class Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  required: boolean;
  order: number;
}

export class Survey {
  questions: Question[] = [];

  addQuestion(question: Question) {
    this.questions.push(question);
  }
}
