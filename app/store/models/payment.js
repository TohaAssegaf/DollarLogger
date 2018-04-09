import { PAYMENTS_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'

export function getPayments() {
  return AsyncStorage.getItem(PAYMENTS_ASYNC_STORAGE_KEY)
    .then(payments => payments === null ? [] : JSON.parse(payments))
}

export function addPayment(total: number, name: string, date: Date) {
  return getPayments().then(payments => {
    // TODO(renzobautista): Separate ID generation into a new class so it can be mocked
    const id = new Date().getTime()
    const payment = {
      id,
      total,
      name,
      date
    }
    payments.push(payment)
    return AsyncStorage.setItem(PAYMENTS_ASYNC_STORAGE_KEY, JSON.stringify(payments))
      .then(() => payment)
  })
}
