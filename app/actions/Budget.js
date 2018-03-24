import * as ActionTypes from './ActionTypes'

export function setBudget(budget) {
  return {
    type: ActionTypes.SET_BUDGET,
    budget
  }
}
