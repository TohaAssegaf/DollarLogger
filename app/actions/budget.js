import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  GET_BUDGET_TOTAL_REQUEST,
  GET_BUDGET_TOTAL_SUCCESS,
  GET_BUDGET_TOTAL_FAILURE,
  SetBudgetTotalRequestAction,
  SetBudgetTotalSuccessAction,
  SetBudgetTotalFailureAction,
  GetBudgetTotalRequestAction,
  GetBudgetTotalSuccessAction,
  GetBudgetTotalFailureAction
} from './ActionTypes'
import * as BudgetModel from '/app/store/models/budget'

export function setBudgetTotalRequest(): SetBudgetTotalRequestAction {
  return {
    type: SET_BUDGET_TOTAL_REQUEST
  }
}

export function setBudgetTotalSuccess(total: number): SetBudgetTotalSuccessAction {
  return {
    type: SET_BUDGET_TOTAL_SUCCESS,
    total
  }
}

export function setBudgetTotalFailure(errorMessage: string): SetBudgetTotalFailureAction {
  return {
    type: SET_BUDGET_TOTAL_FAILURE,
    errorMessage
  }
}

export function setBudgetTotal(total: number) {
  return function(dispatch) {
    if (total <= 0) {
      dispatch(setBudgetTotalFailure("Budget must be greater than 0"))
    }
    if (!Number.isInteger(total)) {
      dispatch(setBudgetTotalFailure("Budget must be an integer"))
    }
    dispatch(setBudgetTotalRequest(total))
    return BudgetModel.setTotal(total)
      .then(() => {
        dispatch(setBudgetTotalSuccess(total))
        dispatch(NavigationActions.back())
      })
      .catch(error => dispatch(setBudgetTotalFailure(error.message)))
  }
}

export function getBudgetTotalRequest(): GetBudgetTotalRequestAction {
  return {
    type: GET_BUDGET_TOTAL_REQUEST
  }
}

export function getBudgetTotalSuccess(total: ?number): GetBudgetTotalSuccessAction {
  return {
    type: GET_BUDGET_TOTAL_SUCCESS,
    total
  }
}

export function getBudgetTotalFailure(errorMessage: string): GetBudgetTotalFailureAction {
  return {
    type: GET_BUDGET_TOTAL_FAILURE,
    errorMessage
  }
}

export function getBudgetTotal() {
  return function(dispatch) {
    dispatch(getBudgetTotalRequest())
    return BudgetModel.getTotal()
      .then((total) => {
        if (total === null) {
          dispatch(getBudgetTotalSuccess(null))
        } else {
          dispatch(getBudgetTotalSuccess(total))
        }
      })
      .catch(error => dispatch(getBudgetTotalFailure(error.message)))
  }
}
