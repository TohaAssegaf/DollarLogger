import firebase from 'react-native-firebase'
import * as FBAuth from './FBAuth'

const AUTH_STRATEGIES = [FBAuth]

export function isLoggedIn() {
  return firebase.auth().currentUser !== null
}

export function logout() {
  firebase.auth().signOut()
  for (const strategy of AUTH_STRATEGIES) {
    strategy.logout()
  }
}

export function onAuthStateChanged(listener: Function) {
  return firebase.auth().onAuthStateChanged(listener)
}
