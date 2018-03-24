import actions from '../../../app/actions'
import reducer from '../../../app/reducers'

describe('BudgetReducer', () => {
  it('should decrease budget', () => {
    originalState = createStateWithBudgetTotal(35000)
    const newBudgetTotal = 25000
    expectedNewState = createStateWithBudgetTotal(newBudgetTotal)
    expect(
      reducer(originalState, actions.setBudgetTotal(newBudgetTotal))).toEqual(expectedNewState)
  })

  it('should increase budget', () => {
    originalState = createStateWithBudgetTotal(25000)
    const newBudgetTotal = 35000
    expectedNewState = createStateWithBudgetTotal(newBudgetTotal)
    expect(
      reducer(originalState, actions.setBudgetTotal(newBudgetTotal))).toEqual(expectedNewState)
  })

  it('should not update budget with 0 value', () => {
    const oldBudgetTotal = 25000
    originalState = createStateWithBudgetTotal(oldBudgetTotal)
    expect(reducer(originalState, actions.setBudgetTotal(0))).toEqual(originalState)
  })

  it('should not update budget with negative value', () => {
    const oldBudgetTotal = 25000
    originalState = createStateWithBudgetTotal(oldBudgetTotal)
    expect(reducer(originalState, actions.setBudgetTotal(-1))).toEqual(originalState)
  })
})

function createStateWithBudgetTotal(total) {
  return {
    budget : {
      total
    }
  }
}
