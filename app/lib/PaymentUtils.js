import * as DateUtils from './DateUtils'

export function filterCurrentWeekPayments(payments: Array<Payment>) {
  const lastMonday = DateUtils.getLastMonday(new Date())
  return payments.filter(payment => payment.date >= lastMonday)
}

export function getTotalSpend(payments: Array<Payment>) {
  return payments.reduce((total, payment) => total + payment.total, 0)
}
