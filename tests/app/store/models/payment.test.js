import * as PaymentModel from '/app/store/models/payment'

let mockStorage = {}
jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        mockStorage[item] = value;
        resolve(value);
      });
    }),
    getItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        resolve(mockStorage[item]);
      });
    }),
  }
}))

describe('BudgetModel', () => {
  beforeEach(() => {
    mockStorage = {}
  })

  it('should return empty list if nothing is in storage', () => {
    PaymentModel.getPayments().then(payments => expect(payments).toEqual([]))
  })

  it('should successfully add payment', () => {
    const total = 10000
    const name = "Fake payment"
    const date = new Date(2018, 4, 2)
    PaymentModel.addPayment(total, name, date).then(
      () => PaymentModel.getPayments().then(payments => {
        expect(payments).toHaveLength(1)
        const payment = payments[0]
        // TODO(renzobautista): Separate ID generation into a new class so it can be mocked and we
        // can compare entire payment object.
        expect(payment.total).toEqual(total)
        expect(payment.name).toEqual(name)
        expect(payment.date).toEqual(date)
      }))

  })
})
