import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentUtils from '~/app/lib/PaymentUtils'
import * as DatabaseUtils from '~/app/lib/database/DatabaseUtils'

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
  const deletedDbPayment: Payment = PaymentUtils.setDeleted(
    new PaymentBuilder(localPayment).build())

  const payments = DatabaseUtils.syncPayments([localPayment], [deletedDbPayment])

  expect(payments).toEqual([deletedDbPayment])
})
