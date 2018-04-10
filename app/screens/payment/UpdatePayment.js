import styles from './styles'
import UpdatePaymetForm from '/app/components/payment/UpdatePaymetForm'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR } from '/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class UpdatePayment extends React.Component {
  static navigationOptions = {
    title: 'Update Payment',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  constructor(props) {
    super(props)
    const paymentId = this.props.navigation.state.params.paymentId
    this.state = {
      payment: this.props.payments.find(payment => payment.id === paymentId)
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <UpdatePaymentForm payment={this.state.payment} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    payments: state.payment.payments
  }
}

export default connect(mapStateToProps)(UpdatePayment)
