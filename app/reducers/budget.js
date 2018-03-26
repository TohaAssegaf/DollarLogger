import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  Action } from '/app/actions/ActionTypes'
import BudgetState from '/app/store/state/BudgetState'

const initialState: BudgetState = { total: 0 }

export default function(state: BudgetState = initialState, action: Action): BudgetState {
  switch(action.type) {
    case SET_BUDGET_TOTAL_REQUEST: return setBudgetTotalRequest(state, action)
    case SET_BUDGET_TOTAL_SUCCESS: return setBudgetTotalSuccess(state, action)
    case SET_BUDGET_TOTAL_FAILURE: return setBudgetTotalFailure(state, action)
    default: return state
  }
}

function setBudgetTotalRequest(
    state: BudgetState, action: SetBudgetTotalRequestAction): BudgetState {
  return Object.assign({}, state, { isWriting: true, errorMessage: "" })
}

function setBudgetTotalSuccess(
    state: BudgetState, action: SetBudgetTotalSuccessAction): BudgetState {
  return Object.assign({}, state, { total: action.total, isWriting: false, errorMessage: "" })
}

function setBudgetTotalFailure(
    state: BudgetState, action: SetBudgetTotalFailureAction): BudgetState {
  return Object.assign({}, state, { errorMessage: action.errorMessage, isWriting: false })
}
