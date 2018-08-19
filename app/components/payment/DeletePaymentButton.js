import styles from './styles'
import actions from '~/app/actions'
import { DANGER_BUTTON_COLOR } from '~/app/config/colors'
import React from 'react'
import { Alert, Button, View } from 'react-native'
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
      <View style={styles.deletePaymentButton}>
        <Button
          onPress={() => this.deletePayment()}
          title='DELETE'
          color={DANGER_BUTTON_COLOR}
          accessibilityLabel='Save payment'/>
      </View>
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
