import actions from '~/app/actions'
import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GetPaymentsRequestAction,
  GetPaymentsSuccessAction,
  GetPaymentsFailureAction,
} from '~/app/actions/ActionTypes'
import PaymentModel from '~/app/store/models/payment'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let mockPayments = []
let mockId = 1
jest.mock('../../../app/store/models/payment', () => {
  return {
    addPayment: jest.fn((payment) => {
      return new Promise((resolve, reject) => {
        mockPayments.push(payment)
        resolve(mockPayments)
      })
    }),
    updatePayment: jest.fn((item, payment) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.map(
          storedPayment => storedPayment.id === mockId ? payment : storedPayment)
        resolve(mockPayments)
      })
    }),
    deletePayment: jest.fn((item, paymentId) => {
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
    })
  }
})
 
describe('PaymentActions', () => {
  beforeEach(() => {
    mockPayments = []
    mockId = 1
  })

  it('should dispatch request and success for successful create payment', () => {
    const total: number = 10000
    const name: string = "Test payment"
    const date: Date = new Date(2018, 4, 2)
    const payment = {
      id: mockId,
      total,
      name,
      date
    }
    mockId += 1
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
    const total: number = 10000
    const newTotal: number = 20000
    const name: string = "Test payment"
    const date: Date = new Date(2018, 4, 2)
    const payment = {
      id: mockId,
      total,
      name,
      date
    }
    mockId += 1
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
    const total: number = 10000
    const name: string = "Test payment"
    const date: Date = new Date(2018, 4, 2)
    const payment = {
      id: mockId,
      total,
      name,
      date
    }
    mockId += 1
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
    const id: number = 1
    const total: number = 10000
    const name: string = "Test payment"
    const date: Date = new Date(2018, 4, 2)
    const payment = {
      id,
      total,
      name,
      date
    }
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
    const total: number = 10000
    const name: string = "Test payment"
    const date: Date = new Date(2018, 4, 2)
    const payment = {
      id: mockId,
      total,
      name,
      date
    }
    const payments = [payment]
    const expectedActions = [actions.getPaymentsRequest(), actions.getPaymentsSuccess(payments)]
    const store = mockStore({ payment: { payments: [] }})

    PaymentModel.addPayment(payment).then(() => {
      store.dispatch(actions.getPayments()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
