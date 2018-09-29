import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as FirebaseUtils from '~/app/lib/database/FirebaseUtils'
import store from '~/app/store'
import MockDate from 'mockdate'
import firebase from 'react-native-firebase'

it('fetches empty payments from mock firebase store', async () => {
  const date = new Date(2018, 3, 3)
  MockDate.set(date)
  const expectedPayments = []

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual(expectedPayments)
  expect(store.getState().payment.fetchSuccessTimestamp).toBe(date.getTime())
})

it('sets fetch failure timestamp', async () => {
  const expectedError = 'test error'
  firebase.database.mockImplementationOnce(() => {
    return {
      ref: () => ({
        child: () => ({
          once: () => {
            return new Promise((resolve, reject) => { throw expectedError })
          }
        })
      })
    }
  })
  const date = new Date(2018, 3, 3)
  MockDate.set(date)

  try {
    await expect(FirebaseUtils.fetchPayments())
  } catch (e) {
    expect(e).toBe(expectedError)
    expect(store.getState().payment.fetchFailureTimestamp).toBe(date.getTime())
  }
})

it('sets push payment failure timestamp for bulk push', async () => {
  const expectedError = 'test error'
  firebase.database.mockImplementationOnce(() => {
    return {
      ref: () => ({
        child: () => ({
          set: () => {
            return new Promise((resolve, reject) => { throw expectedError })
          }
        })
      })
    }
  })
  const date = new Date(2018, 3, 3)
  MockDate.set(date)

  try {
    await expect(FirebaseUtils.pushPayments([]))
  } catch (e) {
    expect(e).toBe(expectedError)
    expect(store.getState().payment.pushPaymentsTimestamp).toBe(date.getTime())
  }
})

it('sets push payment failure timestamp', async () => {
  const expectedError = 'test error'
  firebase.database.mockImplementationOnce(() => {
    return {
      ref: () => ({
        child: () => ({
          child: () => ({
            set: () => {
              return new Promise((resolve, reject) => { throw expectedError })
            }
          })
        })
      })
    }
  })
  const date = new Date(2018, 3, 3)
  MockDate.set(date)
  const payment = new PaymentBuilder()
    .setTotal(10000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .build()

  try {
    await expect(FirebaseUtils.pushPayment(payment))
  } catch (e) {
    expect(e).toBe(expectedError)
    expect(store.getState().payment.pushPaymentsTimestamp).toBe(date.getTime())
  }
})

it('pushes payment to mock firebase store and retrieves it', async () => {
  const payment = new PaymentBuilder()
    .setTotal(10000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .build()

  await FirebaseUtils.pushPayments([payment])

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual([payment])
})

it('pushes single payment to mock firebase store and retrieves it', async () => {
  const payment = new PaymentBuilder()
    .setTotal(10000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .build()

  await FirebaseUtils.pushPayment(payment)

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual([payment])
})

it('updates single payment to mock firebase store and retrieves it', async () => {
  const payment = new PaymentBuilder()
    .setTotal(10000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .build()
  await FirebaseUtils.pushPayment(payment)
  const updatedPayment = new PaymentBuilder(payment).setTotal(20000).build()
  await FirebaseUtils.pushPayment(updatedPayment)

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual([updatedPayment])
})
