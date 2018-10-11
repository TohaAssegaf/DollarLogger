import styles from './styles'
import HomeActionButton from '~/app/components/home/HomeActionButton'
import HomeWeekDetails from '~/app/components/home/HomeWeekDetails'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '~/app/config/colors'
import * as Routes from '~/app/config/Routes'
import * as DateUtils from '~/app/lib/DateUtils'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

const ONE_MINUTE = 60000
const ONE_DAY = 86400000
const ONE_WEEK = ONE_DAY * 7
const THIS_WEEK = 'This week'
const LAST_WEEK = 'Last week'
const NEXT_WEEK = 'Next week'

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params && navigation.state.params.title
      ? navigation.state.params.title
      : THIS_WEEK
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

  getHomeWeekDetailsList() {
    return this.props.paymentWeeks.map(
      (date, index) =>
        <HomeWeekDetails date={date} navigation={this.props.navigation} key={index}/>)
  }

  changeNavigationTitle(title: string) {
    this.props.navigation.setParams({ title })
  }

  onSwiperIndexChanged(index: number) {
    let title = moment(this.props.paymentWeeks[index]).format('MMMM Do YYYY')
    if (index === this.props.currentWeekIndex) {
      title = THIS_WEEK
    }
    if (index === this.props.currentWeekIndex - 1) {
      title = LAST_WEEK
    }
    if (index === this.props.currentWeekIndex + 1) {
      title = NEXT_WEEK
    }
    this.changeNavigationTitle(title)
  }

  render() {
    return (
      <View style={styles.screen}>
        <Swiper
            loop={false}
            index={this.props.currentWeekIndex}
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

// TODO(renzobautista): Fix this to do an infinite scroll instead of doing 52 weeks before/after.
function getPaymentWeeks(paymentContributions: Array<PaymentContribution>): Array<Date> {
  const extraWeekCount: number = 52
  const currentMonday = DateUtils.getLastMonday(new Date())
  let dates = []
  for (let i = extraWeekCount; i > 0; i--) {
    dates.push(new Date(currentMonday.getTime() - ONE_WEEK * i))
  }
  dates.push(currentMonday)
  for (let i = 1; i <= extraWeekCount; i++) {
    dates.push(new Date(currentMonday.getTime() + ONE_WEEK * i))
  }
  return dates
}

const mapStateToProps = state => {
  const paymentContributions = PaymentUtils.getSortedPaymentContributions(state.payment.payments)
  const paymentWeeks = getPaymentWeeks(paymentContributions)
  const currentWeekIndex = paymentWeeks.map(
    date => date.getTime()).indexOf(DateUtils.getLastMonday(new Date()).getTime())
  return {
    paymentContributions,
    paymentWeeks,
    currentWeekIndex,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncPayments: () => dispatch(actions.syncPayments())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
