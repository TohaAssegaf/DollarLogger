import { PAYMENTS_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'

export function getPayments() {
  return AsyncStorage.getItem(PAYMENTS_ASYNC_STORAGE_KEY)
    .then(payments => payments === null ? [] : JSON.parse(payments))
}

export function addPayment(total: number, name: string, date: Date) {
  return getPayments().then(payments => {
    const id = new Date().getUTCMilliseconds()
    const payment = {
      id,
      total,
      name,
      date
    }
    payments.push(payment)
    return AsyncStorage.setItem(BUDGET_ASYNC_STORAGE_KEY, JSON.stringify(payments))
  })
}
