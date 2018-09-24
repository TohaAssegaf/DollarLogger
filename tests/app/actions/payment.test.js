import actions from '~/app/actions'
import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GetPaymentsRequestAction,
  GetPaymentsSuccessAction,
  GetPaymentsFailureAction,
} from '~/app/actions/ActionTypes'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentModel from '~/app/store/models/payment'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let mockPayments = []
jest.mock('../../../app/store/models/payment', () => {
  return {
    addPayment: jest.fn((payment) => {
      return new Promise((resolve, reject) => {
        mockPayments.push(payment)
        resolve(mockPayments)
      })
    }),
    updatePayment: jest.fn((payment) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.map(
          storedPayment => storedPayment.id === payment.id ? payment : storedPayment)
        resolve(mockPayments)
      })
    }),
    deletePayment: jest.fn((paymentId) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.filter(
          storedPayment => storedPayment.id !== paymentId)
        resolve(mockPayments)
      })
    }),
    getPayments: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(mockPayments);
      })
    }),
    syncPayments: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(mockPayments);
      })
    })
  }
})

describe('PaymentActions', () => {
  beforeEach(() => {
    mockPayments = []
  })
  it('should dispatch request and success for successful create payment', () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    const payments = [payment]
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess(payments)]
    const store = mockStore({ payment: { payments: [] }})

    store.dispatch(actions.createPayment(payment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      PaymentModel.getPayments().then(storedPayments => {
        expect(storedPayments).toHaveLength(1)
        expect(storedPayments[0]).toEqual(payment)
      })
    })
  })

  it('should dispatch request and success for successful update payment', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
      const newTotal = 20000
    await PaymentModel.addPayment(payment)
    const newPayment = Object.assign({}, payment, { total: newTotal })
    const payments = [newPayment]
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess(payments)]
    const store = mockStore({ payment: { payments: [] }})

    store.dispatch(actions.updatePayment(newPayment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      PaymentModel.getPayments().then(storedPayments => {
        expect(storedPayments).toHaveLength(1)
        expect(storedPayments[0]).toEqual(newPayment)
      })
    })
  })

  it('should dispatch request and success for successful delete payment', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    await PaymentModel.addPayment(payment)
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess([])]
    const store = mockStore({ payment: { payments: [] }})

    store.dispatch(actions.deletePayment(payment.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      PaymentModel.getPayments().then(storedPayments => {
        expect(storedPayments).toHaveLength(0)
      })
    })
  })

  it('should create an action to get payments request', () => {
    const expectedAction: GetPaymentsRequestAction = {
      type: GET_PAYMENTS_REQUEST,
    }
    expect(actions.getPaymentsRequest()).toEqual(expectedAction)
  })

  it('should create an action to get payments request success', () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    const payments = [payment]
    const expectedAction: GetPaymentsSuccessAction = {
      type: GET_PAYMENTS_SUCCESS,
      payments
    }
    expect(actions.getPaymentsSuccess(payments)).toEqual(expectedAction)
  })

  it('should create an action to get payments request failure', () => {
    const errorMessage: string = "Test error"
    const expectedAction: GetPaymentsFailureAction = {
      type: GET_PAYMENTS_FAILURE,
      errorMessage
    }
    expect(actions.getPaymentsFailure(errorMessage)).toEqual(expectedAction)
  })

  it('should dispatch request and success for successful get payments', () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    const payments = [payment]
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess(payments)]
    const store = mockStore({ payment: { payments: [] }})

    PaymentModel.addPayment(payment).then(() => {
      store.dispatch(actions.getPayments()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  it('should dispatch request and success for successful sync payments', () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    const payments = [payment]
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess(payments)]
    const store = mockStore({ payment: { payments: [] }})

    PaymentModel.addPayment(payment).then(() => {
      store.dispatch(actions.syncPayments()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
