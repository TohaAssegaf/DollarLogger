import * as Routes from '~/app/config/Routes'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import { FlatList } from 'react-native'

export type Setting = {
  displayName: string,
  action: Function,
}

export function createSettings(navigationProp): Array<Setting> {
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
        () => navigationProp.goBack())) // TODO(renzobautista): Implement this for real.
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
