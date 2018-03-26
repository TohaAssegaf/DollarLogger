import actions from '/app/actions'
import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  SetBudgetTotalRequestAction,
  SetBudgetTotalSuccessAction,
  SetBudgetTotalFailureAction,
} from '/app/actions/ActionTypes'
 
describe('BudgetActions', () => {
  it('should create an action to set new budget total request', () => {
    const expectedAction: SetBudgetTotalRequestAction = {
      type: SET_BUDGET_TOTAL_REQUEST,
    }
    expect(actions.setBudgetTotalRequest()).toEqual(expectedAction)
  })

  it('should create an action to set new budget total request success', () => {
    const total: number = 10000
    const expectedAction: SetBudgetTotalSuccessAction = {
      type: SET_BUDGET_TOTAL_SUCCESS,
      total
    }
    expect(actions.setBudgetTotalSuccess(total)).toEqual(expectedAction)
  })

  it('should create an action to set new budget total failure', () => {
    const errorMessage: string = "Test error"
    const expectedAction: SetBudgetTotalFailureAction = {
      type: SET_BUDGET_TOTAL_FAILURE,
      errorMessage
    }
    expect(actions.setBudgetTotalFailure(errorMessage)).toEqual(expectedAction)
  })
})
