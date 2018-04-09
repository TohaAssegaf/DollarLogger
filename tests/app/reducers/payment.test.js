import actions from '/app/actions'
import reducer from '/app/reducers'
import State from '/app/store/state'

describe('PaymentReducer', () => {
  it('should make add payment request', () => {
    const originalState: State = { payment: createPaymentState([], false, '', true) }
    const expectedState: State = createPaymentState([], true, '', true)
    expect(
      reducer(originalState, actions.createPaymentRequest()).payment).toEqual(expectedState)
  })

  it('should add payment successfully', () => {
    const payment: Payment = {
      id: 1,
      total: 10000,
      name: "Test payment",
      date: new Date(2018, 4, 2)
    }
    const originalState: State = { payment: createPaymentState([], true, '', true) }
    const expectedState: State = createPaymentState([payment], false, '', true)
    expect(
      reducer(originalState, actions.createPaymentSuccess(payment)).payment)
          .toEqual(expectedState)
  })

  it('should set error message on add payment failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { payment: createPaymentState([], true, '', true) }
    const expectedState: State = createPaymentState([], false, errorMessage, true)
    expect(
      reducer(originalState, actions.createPaymentFailure(errorMessage)).payment)
          .toEqual(expectedState)
  })

  it('should make get payments request', () => {
    const originalState: State = { payment: createPaymentState([], false, '', true) }
    const expectedState: State = createPaymentState([], false, '', false)
    expect(
      reducer(originalState, actions.getPaymentsRequest()).payment).toEqual(expectedState)
  })

  it('should get payments successfully', () => {
    const payment: Payment = {
      id: 1,
      total: 10000,
      name: "Test payment",
      date: new Date(2018, 4, 2)
    }
    const payments = [payment]
    const originalState: State = { payment: createPaymentState([], false, '', false) }
    const expectedState: State = createPaymentState(payments, false, '', true)
    expect(
      reducer(originalState, actions.getPaymentsSuccess(payments)).payment)
          .toEqual(expectedState)
  })

  it('should set error message on add payment failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { payment: createPaymentState([], false, '', false) }
    const expectedState: State = createPaymentState([], false, errorMessage, true)
    expect(
      reducer(originalState, actions.getPaymentsFailure(errorMessage)).payment)
          .toEqual(expectedState)
  })
})

function createPaymentState(
    payments: Array<Payment>,
    isCreatingPayment: boolean,
    errorMessage: string,
    isFetchComplete: boolean): State {
  return {
    payments,
    isCreatingPayment,
    errorMessage,
    isFetchComplete
  }
}
