import firebase from 'react-native-firebase'

export function isLoggedIn() {
  return firebase.auth().currentUser !== null
}
