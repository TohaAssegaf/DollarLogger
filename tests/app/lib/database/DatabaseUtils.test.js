import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as DatabaseUtils from '~/app/lib/database/DatabaseUtils'

it('syncs local payments if none exist in database', () => {
  const payment: Payment = new PaymentBuilder()
    .setTotal(10000)
    .setDate(new Date(4, 4, 2018))
    .setName("Test payment")
    .build()
  const localPayments: Array<Payment> = [payment]

  const payments = DatabaseUtils.syncPayments(localPayments, [])

  expect(payments).toEqual(localPayments)
})
