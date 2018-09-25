import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as FirebaseUtils from '~/app/lib/database/FirebaseUtils'

it('fetches empty payments from mock firebase store', async () => {
  const expectedPayments = []

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual(expectedPayments)
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
