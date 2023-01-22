import { Loan } from '@modules/loan/models/Loan';

export function createLoan() {
  const loan = new Loan();

  return loan;
}
