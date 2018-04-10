import BasePaymentForm from './BasePaymentForm'
import actions from '/app/actions'
import MoneyField from '/app/components/money/MoneyField'
import { PRIMARY_BUTTON_COLOR } from '/app/config/colors'
import React from 'react'
import { Button, Keyboard, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

class AddPaymentForm extends React.Component {
  createPayment(total, name, date) {
    this.props.createPayment(total, name, date)

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  render() {
    return (
      <BasePaymentForm
        onSubmit={(total, name, date) => this.createPayment(total, name, date)}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPayment: (total, name, date) => {
      dispatch(actions.createPayment(total, name, date))
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(AddPaymentForm)
