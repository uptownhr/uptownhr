import { Loan } from '@modules/loan/models/Loan';

export function createLoan(loanProperties: Partial<Loan>) {
  const loan = new Loan(loanProperties.terms);

  return loan;
}
