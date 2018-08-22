import * as DateUtils from './DateUtils'

ONE_DAY = 86400000
ONE_WEEK = ONE_DAY * 7

export function filterCurrentWeekPayments(payments: Array<Payment>) {
  return payments.filter(payment => isCurrentWeekPayment(payment))
}

export function filterCurrentWeekPaymentContributions(payments: Array<Payment>) {
  return payments
    .map(payment => payment.paymentContributions)
    .reduce((pc1, pc2) => pc1.concat(pc2), []) // no javascript flatMap support...
    .filter(paymentContribution => isCurrentWeekPaymentContribution(paymentContribution))
}

export function getTotalSpend(paymentContributions: Array<PaymentContribution>) {
  return paymentContributions.reduce(
    (total, paymentContribution) => total + paymentContribution.total, 0)
}

function isCurrentWeekPayment(payment: Payment) {
  return payment.paymentContributions.some(
    paymentContribution => isCurrentWeekPaymentContribution(paymentContribution))
}

function isCurrentWeekPaymentContribution(paymentContribution: PaymentContribution) {
  const lastMonday = DateUtils.getLastMonday(new Date())
  const nextMonday = new Date(lastMonday.getTime() + ONE_WEEK)
  return paymentContribution.date >= lastMonday && paymentContribution.date < nextMonday
}
