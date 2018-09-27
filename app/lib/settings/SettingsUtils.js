import actions from '~/app/actions'
import * as Routes from '~/app/config/Routes'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import { FlatList } from 'react-native'

export type Setting = {
  displayName: string,
  action: Function,
}

export function createSettings(navigationProp, dispatch): Array<Setting> {
  let settings = []

  // Always have update budget setting.
  settings.push(
    createSetting(
      'Update budget',
      () => navigationProp.navigate(Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true })))

  // Sign out or sign in setting, depending on if user is logged in.
  if (AuthUtils.isLoggedIn()) {
    settings.push(
      createSetting(
        'Sign out',
        () => {
          AuthUtils.logout()
          dispatch(actions.clearLocalPayments())
          navigationProp.goBack()
        }))
  } else {
    settings.push(
      createSetting(
        'Sign in to backup your data',
        () => navigationProp.navigate(Routes.LOGIN)))
  }

  return settings
}

function createSetting(displayName: String, action: Function): Setting {
  return {
    displayName,
    action
  }
}
