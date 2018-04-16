import styles from './styles'
import actions from '/app/actions'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '/app/config/colors'
import * as Routes from '/app/config/Routes'
import React from 'react';
import { Text, View } from 'react-native'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text>Placeholder settings screen.</Text>
      </View>
    );
  }
}
