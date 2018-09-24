import * as FBAuth from '~/app/lib/auth/FBAuth'
import React from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class FBAuthButton extends React.Component {
  handleError(error) {
    alert(error.message)
  }

  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) =>
              FBAuth.login(error, result)
                .then(() => this.props.onLoginComplete())
                .catch(error => this.handleError(error))
          } />
      </View>
    );
  }
}
