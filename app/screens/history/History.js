import styles from './styles'
import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR } from '~/app/config/colors'
import * as Routes from '~/app/config/Routes'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'

class History extends React.Component {
  static navigationOptions = {
    title: 'Payment History',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  navigateToUpdatePayment(paymentId: number) {
    this.props.navigation.navigate(
      Routes.UPDATE_PAYMENT,
      { payment: this.props.payments.find(payment => payment.id == paymentId) })
  }

  render() {
    return (
      <View style={styles.screen}>
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
    payments: state.payment.payments,
    paymentContributions:
      PaymentUtils.getSortedPaymentContributions(state.payment.payments).reverse(),
  }
}


export default connect(mapStateToProps)(History)
