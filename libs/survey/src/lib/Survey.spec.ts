import { Survey } from './Survey';

describe('Survey', () => {
  it('should create an instance', () => {
    expect(new Survey()).toBeTruthy();
  });

  it('can add new questions', () => {
    const survey = new Survey();

    survey.addQuestion({
      id: '1',
      text: 'What is your name?',
      type: 'text',
      required: true,
      order: 1,
    });

    expect(survey.questions.length).toEqual(1);
    expect(survey.questions[0].id).toEqual('1');
  });
});
