import actions from '/app/actions'
import reducer from '/app/reducers'
import State from '/app/store/state'

const LARGE_BUDGET: number = 35000
const SMALL_BUDGET: number = 25000

describe('BudgetReducer', () => {
  it('should decrease budget', () => {
    testBudgetTotalSuccessChange(LARGE_BUDGET, SMALL_BUDGET, SMALL_BUDGET)
  })

  it('should increase budget', () => {
    testBudgetTotalSuccessChange(SMALL_BUDGET, LARGE_BUDGET, LARGE_BUDGET)
  })

  it('should make set budget request', () => {
    const originalState: State = createState(SMALL_BUDGET, "", false)
    const expectedState: State = createState(SMALL_BUDGET, "", true)
    expect(
      reducer(originalState, actions.setBudgetTotalRequest())).toEqual(expectedState)
  })

  it('should set error message', () => {
    const errorMessage = "Test error"
    const originalState: State = createState(SMALL_BUDGET, "", true)
    const expectedState: State = createState(SMALL_BUDGET, errorMessage, false)
    expect(
      reducer(originalState, actions.setBudgetTotalFailure(errorMessage))).toEqual(expectedState)
  })
})

function testBudgetTotalSuccessChange(
    oldBudgetTotal: number, actionBudgetTotal: number, expectedBudgetTotal: number) {
  const originalState: State = createState(oldBudgetTotal, "", true)
  const expectedState: State =
      createState(expectedBudgetTotal, "", false)
  expect(
    reducer(originalState, actions.setBudgetTotalSuccess(actionBudgetTotal))).toEqual(expectedState)
}

function createState(total: number, errorMessage: string, isWriting: boolean): State {
  return {
    budget: {
      total,
      errorMessage,
      isWriting
    }
  }
}
