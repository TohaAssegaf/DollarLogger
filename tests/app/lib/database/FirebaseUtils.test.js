import * as FirebaseUtils from '~/app/lib/database/FirebaseUtils'

it('fetches payments from mock firebase store', async () => {
  const expectedPayments = []

  const payments = await FirebaseUtils.fetchPayments()

  expect(payments).toEqual(expectedPayments)
})
