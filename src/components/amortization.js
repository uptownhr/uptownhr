export function amortization(principal, interestRate, term, additionalPayments, startDate) {
  var payments = [];
  var i = interestRate / 12;
  var n = term * 12;
  var x = Math.pow(1 + i, n);
  var monthlyPayment = (principal * x * i) / (x - 1);
  var currentBalance = principal;
  var totalInterest = 0;
  for (var j = 0; j < n; j++) {
    var interest = currentBalance * i;
    totalInterest += interest;
    var principalPayment = monthlyPayment - interest;
    var additionalPayment = additionalPayments[j] || 0;
    if (additionalPayment) {
      if (currentBalance > additionalPayment) {
        principalPayment += additionalPayment;
        currentBalance -= additionalPayment;
      }
      else {
        principalPayment += currentBalance;
        currentBalance = 0;
      }
    }
    currentBalance = currentBalance - principalPayment;
    var month = j+1;
    var dueDate = new Date(startDate.getFullYear(), startDate.getMonth() + j, startDate.getDate())
    payments.push({month: month, dueDate: dueDate, interest: interest, principal: principalPayment, balance: currentBalance});
  }
  var totalCost = principal + totalInterest;
  console.log({payments: payments, totalCost: totalCost})
  return {payments: payments, totalCost: totalCost};
}
