import * as uuid from 'uuid';
interface Terms {
  amount: number;
  termLength: number;
  interestRate: number;
  startDate: Date;
}

enum LoanStatus {
  DRAFT = 'draft',
}

export class Loan {
  id: string;
  status: LoanStatus;
  terms?: Terms;

  constructor(terms?: Terms) {
    this.id = uuid.v4();
    this.status = LoanStatus.DRAFT;
    this.terms = terms;
  }

  setTerms(terms: Terms) {
    this.terms = terms;
  }
}
