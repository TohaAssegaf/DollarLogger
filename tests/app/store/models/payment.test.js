import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as FirebaseUtils from '~/app/lib/database/FirebaseUtils'
import * as PaymentModel from '~/app/store/models/payment'

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

describe('PaymentModel', () => {
  beforeEach(() => {
    mockStorage = {}
  })

  it('should return empty list if nothing is in storage', () => {
    PaymentModel.getPayments().then(payments => expect(payments).toEqual([]))
  })

  it('should successfully add payment', () => {
    const payment = {
      total: 10000,
      name: "Fake payment",
      date: new Date(2018, 4, 2),
      id: 1,
      paymentContributions: [
        {
          total: 10000,
          displayName: "Fake payment",
          date: new Date(2018, 4, 2),
          paymentId: 1
        }
      ]
    }
    PaymentModel.addPayment(payment).then(
      (payments) => {
        expect(payments).toHaveLength(1)
        expect(payments[0]).toEqual(payment)
      })
  })

  it('should successfully update payment', async () => {
    const total = 10000
    const name = "Fake payment"
    const date = new Date(2018, 4, 2)
    const payments = await PaymentModel.addPayment(total, name, date)
    const payment = payments[0]
    const newTotal = 20000
    const newName = "New name for fake payment"
    const newDate = new Date(2018, 4, 3)

    PaymentModel.updatePayment({ id: payment.id, total: newTotal, name: newName, date: newDate })
      .then(updatedPayments => {
        expect(updatedPayments).toHaveLength(1)
        expect(updatedPayments[0].id).toEqual(payment.id)
        expect(updatedPayments[0].total).toEqual(newTotal)
        expect(updatedPayments[0].name).toEqual(newName)
        expect(updatedPayments[0].date).toEqual(newDate)
      })
  })

  it('should successfully delete payment', async () => {
    const id = 1
    const payment = {
      total: 10000,
      name: "Fake payment",
      date: new Date(2018, 4, 2),
      id,
      paymentContributions: [
        {
          total: 10000,
          displayName: "Fake payment",
          date: new Date(2018, 4, 2),
          paymentId: id
        }
      ]
    }
    const payments = await PaymentModel.addPayment(payment)
    expect(payments).toHaveLength(1)
    const updatedPayments = await PaymentModel.deletePayment(id)
    expect(updatedPayments).toHaveLength(0)
  })

  it('should sync empty list if nothing is in database', () => {
    PaymentModel.syncPayments().then(payments => expect(payments).toEqual([]))
  })

  it('should sync payment if nothing is in local', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    await FirebaseUtils.pushPayments([payment])

    const syncedPayments = await PaymentModel.syncPayments()

    expect(syncedPayments).toEqual([payment])
  })
})
