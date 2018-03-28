import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  SetBudgetTotalRequestAction,
  SetBudgetTotalSuccessAction,
  SetBudgetTotalFailureAction
} from './ActionTypes'
import { BaseNavigator } from '/app/components/navigation/Navigation'
import * as Routes from '/app/config/Routes'
import { BUDGET_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'

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
    return AsyncStorage.setItem(BUDGET_ASYNC_STORAGE_KEY, total.toString())
      .then(() => {
        dispatch(setBudgetTotalSuccess(total))
        dispatch(BaseNavigator.router.getActionForPathAndParams(Routes.HOME))
      })
      .catch(error => dispatch(setBudgetTotalFailure(error.message)))
  }
}
