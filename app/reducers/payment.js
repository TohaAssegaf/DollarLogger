import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  Action
} from '~/app/actions/ActionTypes'
import {
  Payment,
  PaymentState
} from '~/app/store/state/PaymentState'

const initialState: PaymentState = {
  payments: [],
  isLoading: true,
  errorMessage: '',
}

export default function (state: PaymentState = initialState, action: Action): PaymentState {
  switch (action.type) {
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

function getPaymentsRequest(
  state: PaymentState, action: GetPaymentsRequestAction): PaymentState {
  return Object.assign({}, state, {
    isLoading: true,
    errorMessage: ""
  })
}

function getPaymentsSuccess(
  state: PaymentState, action: GetPaymentsSuccessAction): PaymentState {
  let payments = action.payments.slice().filter(payment => !payment.isDeleted)
  return Object.assign({}, state, {
    payments,
    isLoading: false,
  })
}

function getPaymentsFailure(
  state: PaymentState, action: GetPaymentsFailureAction): PaymentState {
  return Object.assign({}, state, {
    errorMessage: action.errorMessage,
    isLoading: false,
  })
}
