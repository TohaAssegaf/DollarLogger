import { Action, SET_BUDGET_TOTAL } from '/app/actions/ActionTypes'
import BudgetState from '/app/store/state/BudgetState'

const initialState : BudgetState = new BudgetState(0)

export default function(state : BudgetState = initialState, action : Action) {
  switch(action.type) {
    case SET_BUDGET_TOTAL: return setBudgetTotal(state, action)
    default: return state
  }
}

function setBudgetTotal(state : BudgetState, action : Action) : BudgetState {
  if (action.total <= 0) {
    return state
  }
  return Object.assign({}, state, new BudgetState(action.total))
}
