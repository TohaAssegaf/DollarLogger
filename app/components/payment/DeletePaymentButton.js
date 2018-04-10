import actions from '/app/actions'
import { DANGER_BUTTON_COLOR } from '/app/config/colors'
import React from 'react'
import { Alert, Button } from 'react-native'
import { connect } from 'react-redux'

class DeletePaymentButton extends React.Component {
  deletePayment() {
    Alert.alert(
      'Delete payment?',
      "This can't be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deletePayment(this.props.payment.id)
            this.props.navigation.goBack()
          },
        },
      ]
    )
  }

  render() {
    return (
      <Button
          onPress={() => this.deletePayment()}
          title='DELETE'
          color={DANGER_BUTTON_COLOR}
          accessibilityLabel='Save payment'/>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePayment: paymentId => {
      dispatch(actions.deletePayment(paymentId))
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(DeletePaymentButton)
