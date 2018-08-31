import styles from './styles'
import {
  HEADER_BACKGROUND_COLOR,
  HEADER_TEXT_COLOR,
} from '~/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'

export default class Login extends React.Component {
  static navigationOptions = ({ navigation}) => {
    return {
      title: 'Sign In',
      headerStyle: {
        backgroundColor: HEADER_BACKGROUND_COLOR,
      },
      headerTintColor: HEADER_TEXT_COLOR,
    }
  }
  render() {
    return (
      <View style={styles.screen}>
        <Text>Skeleton login screen</Text>
      </View>
    );
  }
}
