import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  Action
} from '/app/actions/ActionTypes'
import {
  Payment,
  PaymentState
} from '/app/store/state/PaymentState'

const initialState: PaymentState = {
  payments: [],
  isCreatingPayment: false,
  isFetchComplete: false,
}

export default function (state: PaymentState = initialState, action: Action): PaymentState {
  switch (action.type) {
  case CREATE_PAYMENT_REQUEST:
    return createPaymentRequest(state, action)
  case CREATE_PAYMENT_SUCCESS:
    return createPaymentSuccess(state, action)
  case CREATE_PAYMENT_FAILURE:
    return createPaymentFailure(state, action)
  case GET_PAYMENTS_REQUEST:
    return getPaymentsRequest(state, action)
  case GET_PAYMENTS_SUCCESS:
    return getPaymentsSuccess(state, action)
  case GET_PAYMENTS_FAILURE:
    return getPaymentsFailure(state, action)
  default:
    return state
  }
}

function createPaymentRequest(
  state: PaymentState, action: CreatePaymentRequestAction): PaymentState {
  return Object.assign({}, state, {
    isCreatingPayment: true,
    errorMessage: ""
  })
}

function createPaymentSuccess(
  state: PaymentState, action: CreatePaymentSuccessAction): PaymentState {
  let payments = state.payments.slice()
  payments.push(action.payment)
  return Object.assign({}, state, {
    payments,
    isCreatingPayment: false,
  })
}

function createPaymentFailure(
  state: PaymentState, action: CreatePaymentFailureAction): PaymentState {
  return Object.assign({}, state, {
    errorMessage: action.errorMessage,
    isCreatingPayment: false
  })
}

function getPaymentsRequest(
  state: PaymentState, action: GetPaymentsRequestAction): PaymentState {
  return Object.assign({}, state, {
    isFetchComplete: false,
    errorMessage: ""
  })
}

function getPaymentsSuccess(
  state: PaymentState, action: GetPaymentsSuccessAction): PaymentState {
  let payments = action.payments.slice()
  return Object.assign({}, state, {
    payments,
    isFetchComplete: true,
  })
}

function getPaymentsFailure(
  state: PaymentState, action: GetPaymentsFailureAction): PaymentState {
  return Object.assign({}, state, {
    errorMessage: action.errorMessage,
    isFetchComplete: true
  })
}
