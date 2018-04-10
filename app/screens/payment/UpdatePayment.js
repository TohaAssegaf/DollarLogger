import styles from './styles'
import UpdatePaymentForm from '/app/components/payment/UpdatePaymentForm'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR } from '/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class UpdatePayment extends React.Component {
  static navigationOptions = {
    title: 'Update Payment',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  constructor(props) {
    super(props)
    this.state = {
      payment: this.props.navigation.state.params.payment
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
