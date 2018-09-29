import actions from '~/app/actions'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import reducer from '~/app/reducers'
import State from '~/app/store/state'
import MockDate from 'mockdate'

describe('PaymentReducer', () => {
  it('should make get payments request', () => {
    const originalState: State = { payment: createPaymentState([], false, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], true, '', 0, 0, 0)
    expect(
        reducer(originalState, actions.getPaymentsRequest()).payment)
      .toEqual(expectedState)
  })

  it('should get payments successfully', () => {
    const payment: Payment =
      new PaymentBuilder()
        .setTotal(10000)
        .setName("Test payment")
        .setDate(new Date(2018, 4, 2))
        .build()
    const payments = [payment]
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState(payments, false, '', 0, 0, 0)
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
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], false, '', 0, 0, 0)

    expect(
        reducer(originalState, actions.getPaymentsSuccess([payment])).payment)
      .toEqual(expectedState)
  })

  it('should set error message on add payment failure', () => {
    const errorMessage = "Test error"
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], false, errorMessage, 0, 0, 0)
    expect(
        reducer(originalState, actions.getPaymentsFailure(errorMessage)).payment)
      .toEqual(expectedState)
  })

  it('should set fetch payment success timestamp', () => {
    const date = new Date(2018, 4, 4)
    MockDate.set(date)
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], true, '', date.getTime(), 0, 0)
    expect(reducer(originalState, actions.fetchPaymentsSuccess()).payment).toEqual(expectedState)
  })

  it('should set fetch payment failure timestamp', () => {
    const date = new Date(2018, 4, 4)
    MockDate.set(date)
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], true, '', 0, date.getTime(), 0)
    expect(reducer(originalState, actions.fetchPaymentsFailure()).payment).toEqual(expectedState)
  })

  it('should set push payment failure timestamp', () => {
    const date = new Date(2018, 4, 4)
    MockDate.set(date)
    const originalState: State = { payment: createPaymentState([], true, '', 0, 0, 0) }
    const expectedState: State = createPaymentState([], true, '', 0, 0, date.getTime())
    expect(reducer(originalState, actions.pushPaymentsFailure()).payment).toEqual(expectedState)
  })
})

function createPaymentState(
    payments: Array<Payment>,
    isLoading: boolean,
    errorMessage: string,
    fetchSuccessTimestamp: number,
    fetchFailureTimestamp: number,
    pushFailureTimestamp: number): PaymentState {
  return {
    payments,
    isLoading,
    errorMessage,
    fetchSuccessTimestamp,
    fetchFailureTimestamp,
    pushFailureTimestamp,
  }
}
