import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import firebase from 'react-native-firebase'

it('correctly checks if user is logged in', () => {
  // firebase mock by default logged in
  expect(AuthUtils.isLoggedIn()).toBe(true)

  firebase.auth().signOut()
  expect(AuthUtils.isLoggedIn()).toBe(false)

  firebase.auth().signInWithCredential("RANDOM CREDENTIAL")
  expect(AuthUtils.isLoggedIn()).toBe(true)
})
