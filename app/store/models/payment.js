import { PAYMENTS_ASYNC_STORAGE_KEY } from '~/app/config/storage'
import { AsyncStorage } from 'react-native'

export function getPayments() {
  return AsyncStorage.getItem(PAYMENTS_ASYNC_STORAGE_KEY)
    .then(payments => {
      if (!payments) {
        return []
      }
      return JSON.parse(payments).map(payment => parsePayment(payment))
    })
}

/** Need to parse all date fields into actual Date objects instead of numbers. */
function parsePayment(payment) {
  let paymentContributions = payment.paymentContributions.map(
    paymentContribution =>
      Object.assign({}, paymentContribution, { date: new Date(paymentContribution.date) }))
  return Object.assign({}, payment, { date: new Date(payment.date), paymentContributions })
}

export function addPayment(total: number, name: string, date: Date) {
  return getPayments().then(payments => {
    // TODO(renzobautista): Separate ID generation into a new class so it can be mocked
    const id = new Date().getTime()
    const payment = {
      id,
      total,
      name,
      date,
      paymentContributions: [
        {
          total,
          date,
        }
      ],
    }
    payments.push(payment)
    return AsyncStorage.setItem(PAYMENTS_ASYNC_STORAGE_KEY, JSON.stringify(payments))
      .then(() => payments)
  })
}

export function updatePayment(payment: Payment) {
  return getPayments().then(payments => {
    const updatedPayments = payments.map(
      storedPayment => storedPayment.id === payment.id ? payment : storedPayment)
    return AsyncStorage.setItem(PAYMENTS_ASYNC_STORAGE_KEY, JSON.stringify(updatedPayments))
      .then(() => updatedPayments)
  })
}

export function deletePayment(id: number) {
  return getPayments().then(payments => {
    const updatedPayments = payments.filter(payment => payment.id != id)
    return AsyncStorage.setItem(PAYMENTS_ASYNC_STORAGE_KEY, JSON.stringify(updatedPayments))
      .then(() => updatedPayments)
  })
}
