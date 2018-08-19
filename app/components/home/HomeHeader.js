import styles from './styles'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import * as MoneyFormatter from '~/app/lib/MoneyFormatter'
import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class HomeHeader extends React.Component {
  getCurrentSpend() {
    return PaymentUtils.getTotalSpend(PaymentUtils.filterCurrentWeekPayments(this.props.payments))
  }

  getRemainingBudget() {
    return this.props.budgetTotal - this.getCurrentSpend()
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.cell}>
          <Text style={styles.amount}>
            {MoneyFormatter.formatMoney(this.getRemainingBudget())}
          </Text>
          <Text>Remaining this week</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.amount}>
            {MoneyFormatter.formatMoney(this.getCurrentSpend())}
          </Text>
          <Text>Spent so far</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    budgetTotal: state.budget.total,
    payments: state.payment.payments
  }
}

export default connect(mapStateToProps)(HomeHeader)
