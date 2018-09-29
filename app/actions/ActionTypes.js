import {
  Payment
} from '~/app/store/state/PaymentState'

// Set budget total.
export const SET_BUDGET_TOTAL_REQUEST = 'SET_BUDGET_TOTAL_REQUEST'
export type SetBudgetTotalRequestAction = {
  type: SET_BUDGET_TOTAL_REQUEST
}
export const SET_BUDGET_TOTAL_SUCCESS = 'SET_BUDGET_TOTAL_SUCCESS'
export type SetBudgetTotalSuccessAction = {
  type: SET_BUDGET_TOTAL_SUCCESS,
  total: number
}
export const SET_BUDGET_TOTAL_FAILURE = 'SET_BUDGET_TOTAL_FAILURE'
export type SetBudgetTotalFailureAction = {
  type: SET_BUDGET_TOTAL_FAILURE,
  errorMessage: string
}

// Get budget total.
export const GET_BUDGET_TOTAL_REQUEST = 'GET_BUDGET_TOTAL_REQUEST'
export type GetBudgetTotalRequestAction = {
  type: GET_BUDGET_TOTAL_REQUEST
}
export const GET_BUDGET_TOTAL_SUCCESS = 'GET_BUDGET_TOTAL_SUCCESS'
export type GetBudgetTotalSuccessAction = {
  type: GET_BUDGET_TOTAL_SUCCESS,
  total: number
}
export const GET_BUDGET_TOTAL_FAILURE = 'GET_BUDGET_TOTAL_FAILURE'
export type GetBudgetTotalFailureAction = {
  type: GET_BUDGET_TOTAL_FAILURE,
  errorMessage: string
}

// Get payments.
export const GET_PAYMENTS_REQUEST = 'GET_PAYMENTS_REQUEST'
export type GetPaymentsRequestAction = {
  type: GET_PAYMENTS_REQUEST
}
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS'
export type GetPaymentsSuccessAction = {
  type: GET_PAYMENTS_SUCCESS,
  payments: Array<Payment>,
}
export const GET_PAYMENTS_FAILURE = 'GET_PAYMENTS_FAILURE'
export type GetPaymentsFailureAction = {
  type: GET_PAYMENTS_FAILURE,
  errorMessage: string,
}

// DB push/pull timestamp actions.
export const FETCH_PAYMENTS_SUCCESS = 'FETCH_PAYMENTS_SUCCESS'
export type FetchPaymentsSuccessAction = {
  type: FETCH_PAYMENTS_SUCCESS,
  fetchSuccessTimestamp: number
}
export const FETCH_PAYMENTS_FAILURE = 'FETCH_PAYMENTS_FAILURE'
export type FetchPaymentsFailureAction = {
  type: FETCH_PAYMENTS_FAILURE,
  fetchFailureTimestamp: number
}
export const PUSH_PAYMENTS_FAILURE = 'PUSH_PAYMENTS_FAILURE'
export type PushPaymentsFailureAction = {
  type: PUSH_PAYMENTS_FAILURE,
  pushFailureTimestamp: number
}

export type Action = |
  SetBudgetTotalRequestAction |
  SetBudgetTotalSuccessAction |
  SetBudgetTotalFailureAction |
  GetBudgetTotalRequestAction |
  GetBudgetTotalSuccessAction |
  GetBudgetTotalFailureAction |
  GetPaymentsRequestAction |
  GetPaymentsSuccessAction |
  GetPaymentsFailureAction |
  FetchPaymentsSuccessAction |
  FetchPaymentsFailureAction |
  PushPaymentsFailureAction
