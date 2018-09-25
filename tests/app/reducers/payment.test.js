import actions from '~/app/actions'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import reducer from '~/app/reducers'
import State from '~/app/store/state'

describe('PaymentReducer', () => {
  it('should make get payments request', () => {
    const originalState: State = { payment: createPaymentState([], false, '') }
    const expectedState: State = createPaymentState([], true, '')
    expect(
      reducer(originalState, actions.getPaymentsRequest()).payment).toEqual(expectedState)
  })

  it('should get payments successfully', () => {
    const payment: Payment =
      new PaymentBuilder()
        .setTotal(10000)
        .setName("Test payment")
        .setDate(new Date(2018, 4, 2))
        .build()
    const payments = [payment]
    const originalState: State = { payment: createPaymentState([], true, '') }
    const expectedState: State = createPaymentState(payments, false, '')
    expect(
      reducer(originalState, actions.getPaymentsSuccess(payments)).payment)
          .toEqual(expectedState)
  })

  it('should remove deleted payments from state', () => {
    const payment: Payment =
      PaymentUtils.setDeleted(
        new PaymentBuilder()
          .setTotal(10000)
          .setName("Test payment")
          .setDate(new Date(2018, 4, 2))
          .build())
    const originalState: State = { payment: createPaymentState([], true, '') }
    const expectedState: State = createPaymentState([], false, '')

    expect(
      reducer(originalState, actions.getPaymentsSuccess([payment])).payment)
          .toEqual(expectedState)
  })

  it('should set error message on add payment failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { payment: createPaymentState([], true, '') }
    const expectedState: State = createPaymentState([], false, errorMessage)
    expect(
      reducer(originalState, actions.getPaymentsFailure(errorMessage)).payment)
          .toEqual(expectedState)
  })
})

function createPaymentState(
    payments: Array<Payment>,
    isLoading: boolean,
    errorMessage: string): State {
  return {
    payments,
    isLoading,
    errorMessage,
  }
}
