import { SET_BUDGET_TOTAL, Action } from '/app/actions/ActionTypes'
import BudgetState from '/app/store/state/BudgetState'

const initialState: BudgetState = { total: 0 }

export default function(state: BudgetState = initialState, action: Action): BudgetState {
  switch(action.type) {
    case SET_BUDGET_TOTAL: return setBudgetTotal(state, action)
    default: return state
  }
}

function setBudgetTotal(state: BudgetState, action: Action): BudgetState {
  if (action.total <= 0) {
    return state
  }
  return Object.assign({}, state, { total: action.total })
}
