import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  PUSH_PAYMENTS_FAILURE,
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
  case FETCH_PAYMENTS_SUCCESS:
    return fetchPaymentsSuccess(state, action)
  case FETCH_PAYMENTS_FAILURE:
    return fetchPaymentsFailure(state, action)
  case PUSH_PAYMENTS_FAILURE:
    return pushPaymentsFailure(state, action)
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
  return Object.assign({}, state, { payments, isLoading: false, })
}

function getPaymentsFailure(
    state: PaymentState, action: GetPaymentsFailureAction): PaymentState {
  return Object.assign(
    {},
    state,
    { errorMessage: action.errorMessage, isLoading: false, })
}

function fetchPaymentsSuccess(
    state: PaymentState, action: FetchPaymentsSuccessAction): PaymentState {
  return Object.assign({}, state, { fetchSuccessTimestamp: action.fetchSuccessTimestamp })
}

function fetchPaymentsFailure(
    state: PaymentState, action: FetchPaymentsFailureAction): PaymentState {
  return Object.assign({}, state, { fetchFailureTimestamp: action.fetchFailureTimestamp })
}

function pushPaymentsFailure(
    state: PaymentState, action: PushPaymentsFailureAction): PaymentState {
  return Object.assign({}, state, { pushFailureTimestamp: action.pushFailureTimestamp })
}
