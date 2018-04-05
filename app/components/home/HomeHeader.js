import styles from './styles'
import React from 'react'
import { Text, View } from 'react-native'

export default class HomeHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.cell}>
          <Text style={styles.amount}>$1,250.00</Text>
          <Text>Remaining this week</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.amount}>$1,250.00</Text>
          <Text>Spent so far</Text>
        </View>
      </View>
    );
  }
}
