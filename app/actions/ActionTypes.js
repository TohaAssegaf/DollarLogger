// Budget.
export const SET_BUDGET_TOTAL_REQUEST = 'SET_BUDGET_TOTAL_REQUEST'
export type SetBudgetTotalRequestAction = { type: SET_BUDGET_TOTAL_REQUEST }
export const SET_BUDGET_TOTAL_SUCCESS = 'SET_BUDGET_TOTAL_SUCCESS'
export type SetBudgetTotalSuccessAction = { type: SET_BUDGET_TOTAL_SUCCESS, total: number }
export const SET_BUDGET_TOTAL_FAILURE = 'SET_BUDGET_TOTAL_FAILURE'
export type SetBudgetTotalFailureAction = { type: SET_BUDGET_TOTAL_FAILURE, errorMessage: string }

export type Action =
  | SetBudgetTotalRequestAction
  | SetBudgetTotalSuccessAction
  | SetBudgetTotalFailureAction
