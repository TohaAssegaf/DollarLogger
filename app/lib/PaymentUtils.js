import * as DateUtils from './DateUtils'

export function filterCurrentWeekPayments(payments: Array<Payment>) {
  const lastMonday = DateUtils.getLastMonday(new Date())
  return payments.filter(payment => payment.date >= lastMonday)  
}
