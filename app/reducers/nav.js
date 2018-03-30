import * as Routes from '/app/config/Routes'
import { BaseNavigator } from '/app/components/navigation/Navigation'
import { NavigationActions } from 'react-navigation'

const initialState = BaseNavigator.router.getStateForAction(
    BaseNavigator.router.getActionForPathAndParams(Routes.LOADING))

export default function(state = initialState, action) {
  const nextState = BaseNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
