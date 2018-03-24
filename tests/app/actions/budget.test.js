import actions from '/app/actions'
import { SET_BUDGET_TOTAL, SetBudgetTotalAction} from '/app/actions/ActionTypes'
 
describe('BudgetActions', () => {
  it('should create an action to set new budget total', () => {
    const total: number = 35000
    const expectedAction: SetBudgetTotalAction = {
      type: SET_BUDGET_TOTAL,
      total
    }
    expect(actions.setBudgetTotal(total)).toEqual(expectedAction)
  })
})
