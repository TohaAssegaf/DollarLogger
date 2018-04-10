import styles from './styles'
import HomeHeader from '/app/components/home/HomeHeader'
import PaymentList from '/app/components/payment/PaymentList'
import * as Routes from '/app/config/Routes'
import HomeActionButton from '/app/components/home/HomeActionButton'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

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
    payments: state.payment.payments
  }
}


export default connect(mapStateToProps)(Home)
