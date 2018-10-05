import styles from './styles'
import actions from '~/app/actions'
import HomeHeader from '~/app/components/home/HomeHeader'
import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import * as Routes from '~/app/config/Routes'
import HomeActionButton from '~/app/components/home/HomeActionButton'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '~/app/config/colors'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

const ONE_MINUTE = 60000

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR,
    headerRight:
      <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate(Routes.SETTINGS)}>
        <Icon name="md-settings" size={25} color="white" />
      </TouchableOpacity>,
  })

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.props.fetchSuccessTimestamp < this.props.fetchFailureTimestamp)
      this.props.syncPayments()
    }, ONE_MINUTE)
  }

  /** Should sync payments if last successful fetch was before last failed fetch or push. */
  shouldSyncPayments() {
    return this.props.fetchSuccessTimestamp < this.props.fetchFailureTimestamp ||
      this.props.fetchSuccessTimestamp < this.props.pushFailureTimestamp
  }

  componentWillUnmount() {
    this.clearInterval(this.intervalId)
  }

  navigateToUpdatePayment(paymentId: number) {
    this.props.navigation.navigate(
      Routes.UPDATE_PAYMENT,
      { payment: this.props.payments.find(payment => payment.id == paymentId) })
  }

  getPaymentWeeks() {
    return [...new Set(
      this.props.paymentContributions.map(
        paymentContribution => DateUtils.getLastMonday(paymentContribution.date)))
    ].sort()
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
        <HomeActionButton
          addPaymentAction={() => this.props.navigation.navigate(Routes.ADD_PAYMENT)}
          historyAction={() => this.props.navigation.navigate(Routes.HISTORY)}
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

const mapDispatchToProps = dispatch => {
  return {
    syncPayments: () => dispatch(actions.syncPayments())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
