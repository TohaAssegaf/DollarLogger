import BasePaymentForm from './BasePaymentForm'
import actions from '~/app/actions'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import React from 'react'
import { connect } from 'react-redux'

class UpdatePaymentForm extends React.Component {
  updatePayment(total, name, date, splitCount) {
    const payment =
      new PaymentBuilder(this.props.payment)
        .setTotal(total)
        .setName(name)
        .setDate(date)
        .setSplitCount(splitCount)
        .build()
    this.props.updatePayment(payment)

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  render() {
    return (
      <BasePaymentForm
        payment={this.props.payment}
        onSubmit={
          (total, name, date, splitCount) => this.updatePayment(total, name, date, splitCount)}
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
