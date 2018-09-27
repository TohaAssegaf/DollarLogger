import * as Routes from '~/app/config/Routes'
import * as SettingsUtils from '~/app/lib/settings/SettingsUtils'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import firebase from 'react-native-firebase'

const navigationProp = {
  goBack: jest.fn(),
  navigate: jest.fn(),
}

describe('SettingsUtils', () => {
  beforeEach(() => {
    navigationProp.goBack.mockReset()
    navigationProp.navigate.mockReset()
  })

  it('returns sign out if user is logged in', () => {
    firebase.auth().signInWithCredential("RANDOM CREDENTIAL")

    const settings: Array<Setting> = SettingsUtils.createSettings(navigationProp)

    expect(settings).toHaveLength(2)
    expect(settings[0].displayName).toBe('Update budget')
    expect(settings[1].displayName).toBe('Sign out')

    settings[0].action()
    expect(navigationProp.navigate.mock.calls).toEqual(
      [[Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true }]])

    // Mock firebase starts logged in
    expect(AuthUtils.isLoggedIn()).toBe(true)
    settings[1].action()
    expect(AuthUtils.isLoggedIn()).toBe(false)
    expect(navigationProp.goBack.mock.calls).toEqual([[]])
  })

  it('returns sign in if user is logged out', () => {
    firebase.auth().signOut()

    const settings: Array<Setting> = SettingsUtils.createSettings(navigationProp)

    expect(settings).toHaveLength(2)
    expect(settings[0].displayName).toBe('Update budget')
    expect(settings[1].displayName).toBe('Sign in to backup your data')

    settings[0].action()
    settings[1].action()
    expect(navigationProp.navigate.mock.calls).toEqual(
      [[Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true }], [Routes.LOGIN]])
  })
})
