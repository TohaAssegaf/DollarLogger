import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  CreatePaymentRequestAction,
  CreatePaymentSuccessAction,
  CreatePaymentFailureAction,
  GetPaymentsRequestAction,
  GetPaymentsSuccessAction,
  GetPaymentsFailureAction,
} from '/app/actions/ActionTypes'
import * as PaymentModel from '/app/store/models/payment'
import {
  Payment
} from '/app/store/state/PaymentState'

export function createPaymentRequest(): CreatePaymentRequestAction {
  return {
    type: CREATE_PAYMENT_REQUEST
  }
}

export function createPaymentSuccess(payment: Payment): CreatePaymentSuccessAction {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payment
  }
}

export function createPaymentFailure(errorMessage: string): CreatePaymentFailureAction {
  return {
    type: CREATE_PAYMENT_FAILURE,
    errorMessage
  }
}

export function createPayment(total: number, name: string, date: Date) {
  return function (dispatch) {
    if (!Number.isInteger(total)) {
      dispatch(createPaymentFailure("Payment total must be an integer"))
    }
    dispatch(createPaymentRequest())
    return PaymentModel.addPayment(total, name, date)
      .then(payment => dispatch(createPaymentSuccess(payment)))
      .catch(error => dispatch(createPaymentFailure(error.message)))
  }
}

export function getPaymentsRequest(): GetPaymentsRequestAction {
  return {
    type: GET_PAYMENTS_REQUEST
  }
}

export function getPaymentsSuccess(payments: Array<Payment>): GetPaymentsSuccessAction {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payments
  }
}

export function getPaymentsFailure(errorMessage: string): GetPaymentsFailureAction {
  return {
    type: GET_PAYMENTS_FAILURE,
    errorMessage
  }
}

export function getPayments() {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.getPayments()
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}
