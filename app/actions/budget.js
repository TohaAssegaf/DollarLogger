import {SET_BUDGET_TOTAL, SetBudgetTotalAction} from './ActionTypes'

export function setBudgetTotal(total: number): SetBudgetTotalAction {
  return {
    type: SET_BUDGET_TOTAL,
    total
  }
}
