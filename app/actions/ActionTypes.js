// Budget.
export const SET_BUDGET_TOTAL = 'SET_BUDGET_TOTAL'
export type SetBudgetTotalAction = { type: SET_BUDGET_TOTAL, total: number }

export type Action =
  | SetBudgetTotalAction
