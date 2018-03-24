import * as ActionTypes from './ActionTypes'

export function setBudgetTotal(total) {
  return {
    type: ActionTypes.SET_BUDGET,
    total
  }
}
