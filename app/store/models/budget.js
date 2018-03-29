import { BUDGET_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'

export function getTotal() {
  return AsyncStorage.getItem(BUDGET_ASYNC_STORAGE_KEY)
}

export function setTotal(total: number) {
  return AsyncStorage.setItem(BUDGET_ASYNC_STORAGE_KEY, total.toString())
}
