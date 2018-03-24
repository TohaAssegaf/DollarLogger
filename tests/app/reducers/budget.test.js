import actions from '/app/actions'
import reducer from '/app/reducers'
import State from '/app/store/state'
import BudgetState from '/app/store/state/BudgetState'

const LARGE_BUDGET = 35000
const SMALL_BUDGET = 25000

describe('BudgetReducer', () => {
  it('should decrease budget', () => {
    testBudgetTotalChange(LARGE_BUDGET, SMALL_BUDGET, SMALL_BUDGET)
  })

  it('should increase budget', () => {
    testBudgetTotalChange(SMALL_BUDGET, LARGE_BUDGET, LARGE_BUDGET)
  })

  it('should not update budget with 0 value', () => {
    testBudgetTotalChange(SMALL_BUDGET, 0, SMALL_BUDGET)
  })

  it('should not update budget with negative value', () => {
    testBudgetTotalChange(SMALL_BUDGET, -1, SMALL_BUDGET)
  })
})

function testBudgetTotalChange(
    oldBudgetTotal: number, actionBudgetTotal: number, expectedBudgetTotal: number) {
  const originalState: State = createStateWithBudgetTotal(oldBudgetTotal)
  const expectedState: State =
      createStateWithBudgetTotal(expectedBudgetTotal)
  expect(reducer(originalState, actions.setBudgetTotal(actionBudgetTotal))).toEqual(expectedState)
}

function createStateWithBudgetTotal(total: number): State {
  return {
    budget : new BudgetState(total)
  }
}
