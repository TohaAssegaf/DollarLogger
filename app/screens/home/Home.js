import styles from './styles'
import actions from '~/app/actions'
import HomeWeekDetails from '~/app/components/home/HomeWeekDetails'
import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import * as Routes from '~/app/config/Routes'
import HomeActionButton from '~/app/components/home/HomeActionButton'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '~/app/config/colors'
import * as DateUtils from '~/app/lib/DateUtils'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import moment from 'moment'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

const ONE_MINUTE = 60000
const THIS_WEEK = 'This week'
const LAST_WEEK = 'Last week'
const NEXT_WEEK = 'Next week'

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params && navigation.state.params.title
      ? navigation.state.params.title
      : 'This week'
    return {
      title,
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
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(
      () => {
        if (this.shouldSyncPayments()) {
          this.props.syncPayments()
        }
      },
      ONE_MINUTE)
  }

  /** Should sync payments if last successful fetch was before last failed fetch or push. */
  shouldSyncPayments() {
    return this.props.fetchSuccessTimestamp < this.props.fetchFailureTimestamp ||
      this.props.fetchSuccessTimestamp < this.props.pushFailureTimestamp
  }

  componentWillUnmount() {
    this.clearInterval(this.intervalId)
  }

  getCurrentWeekIndex() {
    return this.props.paymentWeeks.map(
      date => date.getTime()).indexOf(DateUtils.getLastMonday(new Date()).getTime())
  }

  getHomeWeekDetailsList() {
    return this.props.paymentWeeks.map(date => <HomeWeekDetails date={date} />)
  }

  changeNavigationTitle(title: string) {
    this.props.navigation.setParams({ title })
  }

  onSwiperIndexChanged(index: number) {
    let title = moment(this.props.paymentWeeks[index]).format('MMMM Do YYYY')
    if (index === this.getCurrentWeekIndex()) {
      title = THIS_WEEK
    }
    if (index === this.getCurrentWeekIndex() - 1) {
      title = LAST_WEEK
    }
    if (index === this.getCurrentWeekIndex() + 1) {
      title = NEXT_WEEK
    }
    this.changeNavigationTitle(title)
  }

  render() {
    return (
      <View style={styles.screen}>
        <Swiper
            loop={false}
            index={this.getCurrentWeekIndex()}
            showsPagination={false}
            onIndexChanged={index => this.onSwiperIndexChanged(index)}>
          {this.getHomeWeekDetailsList()}
        </Swiper>
        <HomeActionButton
          addPaymentAction={() => this.props.navigation.navigate(Routes.ADD_PAYMENT)}
          historyAction={() => this.props.navigation.navigate(Routes.HISTORY)}
        />
      </View>
    );
  }
}

function getPaymentWeeks(paymentContributions: Array<PaymentContribution>): Array<Date> {
  let dates = []
  let times = new Set()
  let weekStarts = paymentContributions.map(
    paymentContribution => DateUtils.getLastMonday(paymentContribution.date))
  for (const date of weekStarts) {
    if (!times.has(date.getTime())) {
      times.add(date.getTime())
      dates.push(date)
    }
  }
  return dates.sort((a, b) => a - b)
}

const mapStateToProps = state => {
  const paymentContributions = PaymentUtils.getSortedPaymentContributions(state.payment.payments)
  return {
    paymentContributions: paymentContributions,
    paymentWeeks: getPaymentWeeks(paymentContributions)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncPayments: () => dispatch(actions.syncPayments())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
