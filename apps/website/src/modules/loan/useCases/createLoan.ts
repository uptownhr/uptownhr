import { Loan } from '../models/Loan';

export function createLoan(loanProperties: Partial<Loan>) {
  const loan = new Loan(loanProperties.terms);

  return loan;
}
