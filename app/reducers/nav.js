import * as Routes from '/app/config/Routes'
import { BaseNavigator } from '/app/components/navigation/Navigation'

const homeState = BaseNavigator.router.getStateForAction(
    BaseNavigator.router.getActionForPathAndParams(Routes.HOME))
const updateBudgetAction = BaseNavigator.router.getActionForPathAndParams(Routes.UPDATE_BUDGET)
const initialState = BaseNavigator.router.getStateForAction(updateBudgetAction, homeState)

export default function(state = initialState, action) {
  const nextState = BaseNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
