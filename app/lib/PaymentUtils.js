import * as DateUtils from './DateUtils'

const ONE_DAY = 86400000
const ONE_WEEK = ONE_DAY * 7

export function filterPaymentsForWeek(payments: Array<Payment>, date: Date) {
  return payments.filter(payment => isPaymentForWeek(payment, date))
}

export function filterPaymentContributionsForWeek(payments: Array<Payment>, date: Date) {
  return getSortedPaymentContributions(payments)
    .filter(paymentContribution => isPaymentContributionForWeek(paymentContribution, date))
}

export function getTotalSpend(paymentContributions: Array<PaymentContribution>) {
  return paymentContributions.reduce(
    (total, paymentContribution) => total + paymentContribution.total, 0)
}

export function getSortedPaymentContributions(payments: Array<Payment>) {
  return payments
    .map(payment => payment.paymentContributions)
    .reduce((pc1, pc2) => pc1.concat(pc2), []) // no javascript flatMap support...
    .sort(comparePaymentContributions)
}

export function setDeleted(payment: Payment): Payment {
  return Object.assign({}, payment, { isDeleted: true })
}

function comparePaymentContributions(pc1: PaymentContribution, pc2: PaymentContribution) {
  if (pc1.date < pc2.date) {
    return -1
  }
  if (pc1.date > pc2.date) {
    return 1
  }
  if (pc1.id < pc2.id) {
    return -1
  }
  if (pc1.id > pc2.id) {
    return 1
  }
  return 0
}

function isPaymentForWeek(payment: Payment, date: Date) {
  return payment.paymentContributions.some(
    paymentContribution => isPaymentContributionForWeek(paymentContribution, date))
}

function isPaymentContributionForWeek(paymentContribution: PaymentContribution, date: Date) {
  const lastMonday = DateUtils.getLastMonday(date)
  const nextMonday = new Date(lastMonday.getTime() + ONE_WEEK)
  return paymentContribution.date >= lastMonday && paymentContribution.date < nextMonday
}
