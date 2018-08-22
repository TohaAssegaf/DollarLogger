import BasePaymentForm from './BasePaymentForm'
import actions from '~/app/actions'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import React from 'react'
import { connect } from 'react-redux'

class AddPaymentForm extends React.Component {
  createPayment(total, name, date) {
    this.props.createPayment(PaymentUtils.buildPayment(total, name, date))

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
