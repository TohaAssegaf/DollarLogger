import styles from './styles'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export default class SettingsCell extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onTap()} underlayColor='#EEE'>
        <View style={styles.settingsCell}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
