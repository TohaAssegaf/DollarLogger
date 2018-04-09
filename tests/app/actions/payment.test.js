import actions from '/app/actions'
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
import PaymentModel from '/app/store/models/payment'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let mockPayments = []
let mockId = 1
jest.mock('../../../app/store/models/payment', () => {
  return {
    addPayment: jest.fn((item, total, name, date) => {
      return new Promise((resolve, reject) => {
        const payment = {
          id: mockId,
          total,
          name,
          date
        }
        mockPayments.push(payment)
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
  })

  it('should create an action to create payment request', () => {
    const expectedAction: CreatePaymentRequestAction = {
      type: CREATE_PAYMENT_REQUEST,
    }
    expect(actions.createPaymentRequest()).toEqual(expectedAction)
  })

  it('should create an action to create payment request success', () => {
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
    const expectedAction: CreatePaymentSuccessAction = {
      type: CREATE_PAYMENT_SUCCESS,
      payment
    }
    expect(actions.createPaymentSuccess(payment)).toEqual(expectedAction)
  })

  it('should create an action to create payment request failure', () => {
    const errorMessage: string = "Test error"
    const expectedAction: CreatePaymentFailureAction = {
      type: CREATE_PAYMENT_FAILURE,
      errorMessage
    }
    expect(actions.createPaymentFailure(errorMessage)).toEqual(expectedAction)
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
    const expectedActions = [actions.createPaymentRequest(), actions.createPaymentSuccess(payment)]
    const store = mockStore({ payment: { payments: [] }})

    store.dispatch(actions.createPayment(total, name, date)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      PaymentModel.getPayments().then(payments => {
        expect(payments).toContainEqual(payment)
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
