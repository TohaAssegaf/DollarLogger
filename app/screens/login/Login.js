import styles from './styles'
import actions from '~/app/actions'
import FBAuthButton from '~/app/components/login/FBAuthButton'
import {
  HEADER_BACKGROUND_COLOR,
  HEADER_TEXT_COLOR,
} from '~/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Sign In',
      headerStyle: {
        backgroundColor: HEADER_BACKGROUND_COLOR,
      },
      headerTintColor: HEADER_TEXT_COLOR,
    }
  }

  handleUser() {
    this.props.syncPayments()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.screen}>
        <FBAuthButton onLoginComplete={() => this.handleUser()} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncPayments: () => {
      dispatch(actions.syncPayments())
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(Login)
