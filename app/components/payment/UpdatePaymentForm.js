import BasePaymentForm from './BasePaymentForm'
import actions from '/app/actions'
import React from 'react'
import { connect } from 'react-redux'

class UpdatePaymentForm extends React.Component {
  updatePayment(total, name, date) {
    const newPayment = Object.assign({}, this.props.payment, { total, name, date })
    this.props.updatePayment(newPayment)

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  render() {
    return (
      <BasePaymentForm
        onSubmit={(total, name, date) => this.updatePayment(total, name, date)}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePayment: payment => {
      dispatch(actions.updatePayment(payment))
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(UpdatePaymentForm)
