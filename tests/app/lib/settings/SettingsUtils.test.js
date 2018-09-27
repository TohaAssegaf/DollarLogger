import actions from '~/app/actions'
import * as Routes from '~/app/config/Routes'
import * as SettingsUtils from '~/app/lib/settings/SettingsUtils'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import firebase from 'react-native-firebase'

const navigationProp = {
  goBack: jest.fn(),
  navigate: jest.fn(),
}

const dispatch = jest.fn()

describe('SettingsUtils', () => {
  beforeEach(() => {
    navigationProp.goBack.mockReset()
    navigationProp.navigate.mockReset()
  })

  it('returns sign out if user is logged in', () => {
    firebase.auth().signInWithCredential("RANDOM CREDENTIAL")

    const settings: Array<Setting> = SettingsUtils.createSettings(navigationProp, dispatch)

    expect(settings).toHaveLength(2)

    settings[0].action()
    expect(settings[0].displayName).toBe('Update budget')
    expect(navigationProp.navigate.mock.calls).toEqual(
      [[Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true }]])

    // Mock firebase starts logged in
    expect(AuthUtils.isLoggedIn()).toBe(true)
    settings[1].action()
    expect(settings[1].displayName).toBe('Sign out')
    expect(AuthUtils.isLoggedIn()).toBe(false)
    // Need to map functions to their .toString values to check for equality.
    expect(dispatch.mock.calls.map(params => params.map(param => param.toString()))).toEqual(
      [[actions.clearLocalPayments().toString()]])
    expect(navigationProp.goBack.mock.calls).toHaveLength(1)
  })

  it('returns sign in if user is logged out', () => {
    firebase.auth().signOut()

    const settings: Array<Setting> = SettingsUtils.createSettings(navigationProp, dispatch)

    expect(settings).toHaveLength(2)
    expect(settings[0].displayName).toBe('Update budget')
    expect(settings[1].displayName).toBe('Sign in to backup your data')

    settings[0].action()
    settings[1].action()
    expect(navigationProp.navigate.mock.calls).toEqual(
      [[Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true }], [Routes.LOGIN]])
  })
})
