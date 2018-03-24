import * as ActionTypes from './ActionTypes'

export function setBudgetTotal(total: number) {
  return {
    type: ActionTypes.SET_BUDGET,
    total
  }
}
