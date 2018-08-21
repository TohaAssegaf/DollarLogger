import styles from './styles'
import * as MoneyFormatter from '~/app/lib/MoneyFormatter'
import * as DateUtils from '~/app/lib/DateUtils'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export default class PaymentContributionCell extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onTap()} underlayColor='#EEE'>
        <View style={styles.paymentContributionCell}>
          <View style={styles.paymentContributionCellDate}>
            <Text style={styles.paymentContributionCellText}>
              {DateUtils.getShortFormat(this.props.paymentContribution.date)}
            </Text>
          </View>
          <View style={styles.paymentContributionCellName}>
            <Text style={styles.paymentContributionCellText} numberOfLines={2}>
              {this.props.paymentContribution.displayName}
            </Text>
          </View>
          <View style={styles.paymentContributionCellMoney}>
            <Text style={styles.paymentContributionCellText}>
              {MoneyFormatter.formatMoney(this.props.paymentContribution.total)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
