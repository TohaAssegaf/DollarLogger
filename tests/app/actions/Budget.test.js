import * as BudgetActions from '../../../app/actions/Budget'
import * as ActionTypes from '../../../app/actions/ActionTypes'
 
describe('Budget', () => {
  it('should create an action to set new budget', () => {
    const budget = 35000
    const expectedAction = {
      type: ActionTypes.SET_BUDGET,
      budget
    }
    expect(BudgetActions.setBudget(budget)).toEqual(expectedAction)
  })
})
