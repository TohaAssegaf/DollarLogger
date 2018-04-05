import { PAYMENTS_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'

export function getPayments() {
  return AsyncStorage.getItem(PAYMENTS_ASYNC_STORAGE_KEY)
    .then(payments => payments === null ? [] : payments)
}

export function setTotal(total: number) {
  return AsyncStorage.setItem(BUDGET_ASYNC_STORAGE_KEY, total.toString())
}
