import styles from './styles'
import * as MoneyFormatter from '/app/lib/MoneyFormatter'
import React from 'react'
import { Text, View } from 'react-native'

export default class PaymentCell extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.payment.name}</Text>
        <Text>{MoneyFormatter.formatMoneyCents(this.props.payment.total)}</Text>
        <Text>{this.props.payment.date.toString()}</Text>
      </View>
    );
  }
}
