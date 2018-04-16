import styles from './styles'
import HomeHeader from '/app/components/home/HomeHeader'
import PaymentList from '/app/components/payment/PaymentList'
import * as Routes from '/app/config/Routes'
import HomeActionButton from '/app/components/home/HomeActionButton'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '/app/config/colors'
import * as PaymentUtils from '/app/lib/PaymentUtils'
import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

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

  navigateToUpdatePayment(payment) {
    this.props.navigation.navigate(Routes.UPDATE_PAYMENT, { payment })
  }

  render() {
    return (
      <View style={styles.screen}>
        <HomeHeader />
        <PaymentList
          onTapCell={payment => this.navigateToUpdatePayment(payment)}
          payments={this.props.payments}
        />
        <HomeActionButton
          addPaymentAction={() => this.props.navigation.navigate(Routes.ADD_PAYMENT)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    payments: PaymentUtils.filterCurrentWeekPayments(state.payment.payments)
  }
}


export default connect(mapStateToProps)(Home)
