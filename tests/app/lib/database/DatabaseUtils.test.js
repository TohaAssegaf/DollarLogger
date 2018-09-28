import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import * as DatabaseUtils from '~/app/lib/database/DatabaseUtils'
import MockDate from 'mockdate'

it('syncs local payments if none exist in database', () => {
  const localPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()

  const payments = DatabaseUtils.syncPayments([localPayment], [])

  expect(payments).toEqual([localPayment])
})

it('prioritizes database payments over local payments', () => {
  const localPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  const dbPayment: Payment = new PaymentBuilder(localPayment)
    .setTotal(20000)
    .build()

  const payments = DatabaseUtils.syncPayments([localPayment], [dbPayment])

  expect(payments).toEqual([dbPayment])
})

it('sets unsynced deleted local payment to be deleted', () => {
  const deletedLocalPayment: Payment = PaymentUtils.setDeleted(
    new PaymentBuilder()
      .setTotal(10000)
      .setDate(new Date(4, 4, 2018))
      .setName("Test payment")
      .build())
  const dbPayment: Payment = new PaymentBuilder(deletedLocalPayment).build()

  const payments = DatabaseUtils.syncPayments([deletedLocalPayment], [dbPayment])

  expect(payments).toEqual([deletedLocalPayment])
})

it('sets unsynced deleted DB payment to be deleted', () => {
  const localPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  const deletedDbPayment: Payment = PaymentUtils.setDeleted(localPayment)

  const payments = DatabaseUtils.syncPayments([localPayment], [deletedDbPayment])

  expect(payments).toEqual([deletedDbPayment])
})

it('prioritizes unsynced updated local payment over DB payment', () => {
  MockDate.set(new Date(2018, 3, 8))
  const dbPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  MockDate.set(new Date(2018, 3, 9))
  const localPayment: Payment = new PaymentBuilder(dbPayment).setTotal(20000).build()

  const payments = DatabaseUtils.syncPayments([localPayment], [dbPayment])

  expect(payments).toEqual([localPayment])
})

it('prioritizes unsynced updated DB payment over local payment', () => {
  MockDate.set(new Date(2018, 3, 8))
  const localPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  MockDate.set(new Date(2018, 3, 9))
  const dbPayment: Payment = new PaymentBuilder(localPayment).setTotal(20000).build()

  const payments = DatabaseUtils.syncPayments([localPayment], [dbPayment])

  expect(payments).toEqual([dbPayment])
})

it('adds updateTimestamp field to DB payment if none exists', () => {
  MockDate.set(new Date(2018, 3, 9))
  const expectedDbPayment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  let initialDbPayment: Payment = Object.assign({}, expectedDbPayment)
  delete initialDbPayment['updateTimestamp']

  const payments = DatabaseUtils.syncPayments([], [initialDbPayment])

  expect(payments).toEqual([expectedDbPayment])
})
