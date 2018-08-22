import BasePaymentForm from './BasePaymentForm'
import actions from '~/app/actions'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import React from 'react'
import { connect } from 'react-redux'

class AddPaymentForm extends React.Component {
  createPayment(total, name, date, splitCount) {
    this.props.createPayment(
      new PaymentBuilder()
        .setName(name)
        .setTotal(total)
        .setDate(date)
        .setSplitCount(splitCount)
        .build())

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  render() {
    return (
      <BasePaymentForm
        onSubmit={
          (total, name, date, splitCount) => this.createPayment(total, name, date, splitCount)}
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
