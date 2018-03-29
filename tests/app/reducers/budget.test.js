import actions from '/app/actions'
import reducer from '/app/reducers'
import State from '/app/store/state'

const LARGE_BUDGET: number = 35000
const SMALL_BUDGET: number = 25000

describe('BudgetReducer', () => {
  it('should make set budget request', () => {
    const originalState: State = { budget: createState(SMALL_BUDGET, "", false, true) }
    const expectedState: State = createState(SMALL_BUDGET, "", true, true)
    expect(
      reducer(originalState, actions.setBudgetTotalRequest()).budget).toEqual(expectedState)
  })

  it('should increase budget', () => {
    const originalState: State = { budget: createState(SMALL_BUDGET, "", true, true) }
    const expectedState: State = createState(LARGE_BUDGET, "", false, true)
    expect(
      reducer(originalState, actions.setBudgetTotalSuccess(LARGE_BUDGET)).budget)
          .toEqual(expectedState)
  })

  it('should set error message on set failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { budget: createState(SMALL_BUDGET, "", true, true) }
    const expectedState: State = createState(SMALL_BUDGET, errorMessage, false, true)
    expect(
      reducer(originalState, actions.setBudgetTotalFailure(errorMessage)).budget)
          .toEqual(expectedState)
  })

  it('should make get budget request', () => {
    const originalState: State = { budget: createState(SMALL_BUDGET, "", false, false) }
    const expectedState: State = createState(SMALL_BUDGET, "", false, false)
    expect(
      reducer(originalState, actions.getBudgetTotalRequest()).budget).toEqual(expectedState)
  })

  it('should update budget on get success', () => {
    const originalState: State = { budget: createState(0, "", false, false) }
    const expectedState: State = createState(SMALL_BUDGET, "", false, true)
    expect(
        reducer(originalState, actions.getBudgetTotalSuccess(SMALL_BUDGET)).budget)
      .toEqual(expectedState)
  })

  it('should set error message on get failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { budget: createState(SMALL_BUDGET, "", false, false) }
    const expectedState: State = createState(SMALL_BUDGET, errorMessage, false, true)
    expect(
      reducer(originalState, actions.getBudgetTotalFailure(errorMessage)).budget)
          .toEqual(expectedState)
  })
})

function createState(
  total: number, errorMessage: string, isWriting: boolean, isFetchComplete: boolean): State {
  return {
    total,
    errorMessage,
    isWriting,
    isFetchComplete
  }
}
