import actions from '/app/actions'
import * as ActionTypes from '/app/actions/ActionTypes'
 
describe('BudgetActions', () => {
  it('should create an action to set new budget total', () => {
    const total = 35000
    const expectedAction : ActionTypes.SetBudgetTotalAction = {
      type: ActionTypes.SET_BUDGET_TOTAL,
      total
    }
    expect(actions.setBudgetTotal(total)).toEqual(expectedAction)
  })
})
