// Set budget total.
export const SET_BUDGET_TOTAL_REQUEST = 'SET_BUDGET_TOTAL_REQUEST'
export type SetBudgetTotalRequestAction = { type: SET_BUDGET_TOTAL_REQUEST }
export const SET_BUDGET_TOTAL_SUCCESS = 'SET_BUDGET_TOTAL_SUCCESS'
export type SetBudgetTotalSuccessAction = { type: SET_BUDGET_TOTAL_SUCCESS, total: number }
export const SET_BUDGET_TOTAL_FAILURE = 'SET_BUDGET_TOTAL_FAILURE'
export type SetBudgetTotalFailureAction = { type: SET_BUDGET_TOTAL_FAILURE, errorMessage: string }

// Get budget total.
export const GET_BUDGET_TOTAL_REQUEST = 'GET_BUDGET_TOTAL_REQUEST'
export type GetBudgetTotalRequestAction = { type: GET_BUDGET_TOTAL_REQUEST }
export const GET_BUDGET_TOTAL_SUCCESS = 'GET_BUDGET_TOTAL_SUCCESS'
export type GetBudgetTotalSuccessAction = { type: GET_BUDGET_TOTAL_SUCCESS, total: number }
export const GET_BUDGET_TOTAL_FAILURE = 'GET_BUDGET_TOTAL_FAILURE'
export type GetBudgetTotalFailureAction = { type: GET_BUDGET_TOTAL_FAILURE, errorMessage: string }

export type Action =
| SetBudgetTotalRequestAction
| SetBudgetTotalSuccessAction
| SetBudgetTotalFailureAction
| GetBudgetTotalRequestAction
| GetBudgetTotalSuccessAction
| GetBudgetTotalFailureAction
