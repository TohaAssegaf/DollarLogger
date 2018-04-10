import styles from './styles'
import * as MoneyFormatter from '/app/lib/MoneyFormatter'
import * as DateUtils from '/app/lib/DateUtils'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export default class PaymentCell extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onTap()} underlayColor='#EEE'>
        <View style={styles.paymentCell}>
          <View style={styles.paymentCellDate}>
            <Text style={styles.paymentCellText}>
              {DateUtils.getShortFormat(this.props.payment.date)}
            </Text>
          </View>
          <View style={styles.paymentCellName}>
            <Text style={styles.paymentCellText} numberOfLines={2}>
              {this.props.payment.name}
            </Text>
          </View>
          <View style={styles.paymentCellMoney}>
            <Text style={styles.paymentCellText}>
              {MoneyFormatter.formatMoney(this.props.payment.total)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
