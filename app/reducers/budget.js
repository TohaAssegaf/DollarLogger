import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  GET_BUDGET_TOTAL_REQUEST,
  GET_BUDGET_TOTAL_SUCCESS,
  GET_BUDGET_TOTAL_FAILURE,
  Action
} from '/app/actions/ActionTypes'
import BudgetState from '/app/store/state/BudgetState'

const initialState: BudgetState = {
  total: null,
  isFetchComplete: false
}

export default function (state: BudgetState = initialState, action: Action): BudgetState {
  switch (action.type) {
  case SET_BUDGET_TOTAL_REQUEST:
    return setBudgetTotalRequest(state, action)
  case SET_BUDGET_TOTAL_SUCCESS:
    return setBudgetTotalSuccess(state, action)
  case SET_BUDGET_TOTAL_FAILURE:
    return setBudgetTotalFailure(state, action)
  case GET_BUDGET_TOTAL_REQUEST:
    return getBudgetTotalRequest(state, action)
  case GET_BUDGET_TOTAL_SUCCESS:
    return getBudgetTotalSuccess(state, action)
  case GET_BUDGET_TOTAL_FAILURE:
    return getBudgetTotalFailure(state, action)
  default:
    return state
  }
}

function setBudgetTotalRequest(
  state: BudgetState, action: SetBudgetTotalRequestAction): BudgetState {
  return Object.assign({}, state, {
    isWriting: true,
    errorMessage: ""
  })
}

function setBudgetTotalSuccess(
  state: BudgetState, action: SetBudgetTotalSuccessAction): BudgetState {
  return Object.assign({}, state, {
    total: action.total,
    isWriting: false,
    errorMessage: ""
  })
}

function setBudgetTotalFailure(
  state: BudgetState, action: SetBudgetTotalFailureAction): BudgetState {
  return Object.assign({}, state, {
    errorMessage: action.errorMessage,
    isWriting: false
  })
}

function getBudgetTotalRequest(
  state: BudgetState, action: GetBudgetTotalRequestAction): BudgetState {
  return Object.assign({}, state, {
    isFetchComplete: false
  })
}

function getBudgetTotalSuccess(
  state: BudgetState, action: GetBudgetTotalSuccessAction): BudgetState {
  return Object.assign({}, state, {
    total: action.total,
    isFetchComplete: true,
    errorMessage: ""
  })
}

function getBudgetTotalFailure(
  state: BudgetState, action: GetBudgetTotalFailureAction): BudgetState {
  return Object.assign({}, state, {
    errorMessage: action.errorMessage,
    isFetchComplete: true
  })
}