import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'

export const login = (error, result) => {
  if (error) {
    throw new Error('Login failed with error: ' + error.message)
  }
  if (result.isCancelled) {
    throw new Error('User cancelled request.')
  }
  return AccessToken.getCurrentAccessToken().then(data => {
    if (!data) {
      throw new Error('Access token could not be obtained.')
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
    return firebase.auth().signInAndRetrieveDataWithCredential(credential)
  })
}
