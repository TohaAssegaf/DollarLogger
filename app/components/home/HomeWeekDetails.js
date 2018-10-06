import styles from './styles'
import HomeHeader from './HomeHeader'
import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'

class HomeWeekDetails extends React.Component {
  navigateToUpdatePayment(paymentId: number) {
    this.props.navigation.navigate(
      Routes.UPDATE_PAYMENT,
      { payment: this.props.payments.find(payment => payment.id == paymentId) })
  }

  render() {
    return (
      <View style={styles.screen}>
        <HomeHeader />
        <PaymentContributionList
          onTapCell={
            paymentContribution => this.navigateToUpdatePayment(paymentContribution.paymentId)}
          paymentContributions={this.props.paymentContributions}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    payments: PaymentUtils.filterCurrentWeekPayments(state.payment.payments),
    paymentContributions:
      PaymentUtils.filterCurrentWeekPaymentContributions(state.payment.payments),
  }
}

export default withNavigation(connect(mapStateToProps)(HomeWeekDetails))
