import { SET_BUDGET } from '/app/actions/ActionTypes'

const initialState = {
  total: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_BUDGET: return setBudget(state, action)
    default: return state
  }
}

function setBudget(state, action) {
  if (action.total <= 0) {
    return state
  }
  return Object.assign({}, state, { total: action.total })
}
