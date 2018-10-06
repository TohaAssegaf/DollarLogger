import styles from './styles'
import HomeHeader from './HomeHeader'
import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import * as Routes from '~/app/config/Routes'
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
        <HomeHeader date={this.props.date} />
        <PaymentContributionList
          onTapCell={
            paymentContribution => this.navigateToUpdatePayment(paymentContribution.paymentId)}
          paymentContributions={this.props.paymentContributions}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    payments: PaymentUtils.filterPaymentsForWeek(state.payment.payments, ownProps.date),
    paymentContributions:
      PaymentUtils.filterPaymentContributionsForWeek(state.payment.payments, ownProps.date),
  }
}

export default withNavigation(connect(mapStateToProps)(HomeWeekDetails))
