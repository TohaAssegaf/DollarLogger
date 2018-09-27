import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import * as FBAuth from '~/app/lib/auth/FBAuth'
import firebase from 'react-native-firebase'

it('correctly checks if user is logged in', () => {
  // firebase mock by default logged in
  expect(AuthUtils.isLoggedIn()).toBe(true)

  firebase.auth().signOut()
  expect(AuthUtils.isLoggedIn()).toBe(false)

  firebase.auth().signInWithCredential("RANDOM CREDENTIAL")
  expect(AuthUtils.isLoggedIn()).toBe(true)
})

it('logs user out', () => {
  // firebase mock by default logged in
  expect(AuthUtils.isLoggedIn()).toBe(true)

  AuthUtils.logout()

  expect(AuthUtils.isLoggedIn()).toBe(false)
  expect(FBAuth.logout).toBeCalled()
})

it('adds an onAuthStateChangedListener', () => {
  const listener = jest.fn()

  AuthUtils.onAuthStateChanged(listener)

  AuthUtils.logout()
  expect(listener.mock.calls).toHaveLength(1)

  firebase.auth().signInWithCredential("RANDOM CREDENTIAL")
  expect(listener.mock.calls).toHaveLength(2)
})
