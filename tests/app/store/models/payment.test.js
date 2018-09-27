import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import * as FirebaseUtils from '~/app/lib/database/FirebaseUtils'
import * as PaymentModel from '~/app/store/models/payment'
import { AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

describe('PaymentModel', () => {
  it('should return empty list if nothing is in storage', () => {
    PaymentModel.getPayments().then(payments => expect(payments).toEqual([]))
  })

  it('should successfully add payment', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()

    const payments = await PaymentModel.addPayment(payment)
    const dbPayments = await FirebaseUtils.fetchPayments()

    expect(payments).toEqual([payment])
    expect(dbPayments).toEqual([payment])
  })

  it('should successfully update payment', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    await PaymentModel.addPayment(payment)
    const updatedPayment = new PaymentBuilder(payment)
      .setTotal(20000)
      .setName("New name for fake payment")
      .setDate(new Date(2018, 4, 3))
      .build()

    const payments = await PaymentModel.updatePayment(updatedPayment)
    const dbPayments = await FirebaseUtils.fetchPayments()

    expect(payments).toEqual([updatedPayment])
    expect(updatedPayment.id).toEqual(payment.id)
    expect(dbPayments).toEqual([updatedPayment])
  })

  it('should successfully delete payment', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()

    const payments = await PaymentModel.addPayment(payment)
    expect(payments).toEqual([payment])
    const updatedPayments = await PaymentModel.deletePayment(payment.id)
    expect(updatedPayments).toEqual([PaymentUtils.setDeleted(payment)])
    const dbPayments = await FirebaseUtils.fetchPayments()
    expect(dbPayments).toEqual([PaymentUtils.setDeleted(payment)])
  })

  it('should sync empty list if nothing is in database', async () => {
    const payments = await PaymentModel.syncPayments()

    expect(payments).toEqual([])
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

  it('should clear local payments', async () => {
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    await PaymentModel.addPayment(payment)
    expect(await PaymentModel.getPayments()).toEqual([payment])

    const payments = await PaymentModel.clearLocalPayments()

    expect(payments).toEqual([])
    expect(await PaymentModel.getPayments()).toEqual([])
  })

  it('[user logged out] should successfully add payment', async () => {
    firebase.auth().signOut()
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()

    const payments = await PaymentModel.addPayment(payment)

    expect(payments).toEqual([payment])
  })

  it('[user logged out] should successfully update payment', async () => {
    firebase.auth().signOut()
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()
    await PaymentModel.addPayment(payment)
    const updatedPayment = new PaymentBuilder(payment)
      .setTotal(20000)
      .setName("New name for fake payment")
      .setDate(new Date(2018, 4, 3))
      .build()

    const payments = await PaymentModel.updatePayment(updatedPayment)

    expect(payments).toEqual([updatedPayment])
    expect(updatedPayment.id).toEqual(payment.id)
  })

  it('[user logged out] should successfully delete payment', async () => {
    firebase.auth().signOut()
    const payment = new PaymentBuilder()
      .setTotal(10000)
      .setName("Fake payment")
      .setDate(new Date(2018, 4, 2))
      .build()

    const payments = await PaymentModel.addPayment(payment)
    expect(payments).toEqual([payment])
    const updatedPayments = await PaymentModel.deletePayment(payment.id)
    expect(updatedPayments).toEqual([PaymentUtils.setDeleted(payment)])
  })
})
