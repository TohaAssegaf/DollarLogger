import PaymentBuilder from '~/app/lib/PaymentBuilder'
import MockDate from 'mockdate'

it('creates a normal single contribution payment', () => {
  const date = new Date(2018, 3, 8)
  MockDate.set(date)
  const id = date.getTime()
  const total = 1
  const name = "Test payment"
  const expectedPayment = {
    id,
    total,
    name,
    date,
    isDeleted: false,
    paymentContributions: [
      {
        displayName: name,
        total,
        date,
        paymentId: id,
      },
    ],
  }

  const payment = new PaymentBuilder().setName(name).setTotal(total).setDate(date).build()

  expect(payment).toEqual(expectedPayment)
})

it('creates an even split payment over 2 weeks', () => {
  const date = new Date(2018, 3, 5)
  MockDate.set(date)
  const id = date.getTime()
  const total = 2
  const name = "Test payment"

  const splitTotal = 1
  // Following monday after 4/5/2018 is 4/9/2018
  const date2 = new Date(2018, 3, 9)
  const displayName1 = name + " (1/2)"
  const displayName2 = name + " (2/2)"

  const expectedPayment = {
    id,
    total,
    name,
    date,
    isDeleted: false,
    paymentContributions: [
      {
        displayName: displayName1,
        total: splitTotal,
        date,
        paymentId: id,
      },
      {
        displayName: displayName2,
        total: splitTotal,
        date: date2,
        paymentId: id,
      },
    ],
  }

  const payment = new PaymentBuilder()
    .setName(name)
    .setTotal(total)
    .setDate(date)
    .setSplitCount(2)
    .build()

  expect(payment).toEqual(expectedPayment)
})

it('creates an uneven split payment over 3 weeks', () => {
  const date = new Date(2018, 3, 5)
  MockDate.set(date)
  const id = date.getTime()
  const total = 5
  const name = "Test payment"

  const splitTotal1 = 2
  const splitTotal2 = 2
  const splitTotal3 = 1
  // Following monday after 4/5/2018 is 4/9/2018
  const date2 = new Date(2018, 3, 9)
  const date3 = new Date(2018, 3, 16)
  const displayName1 = name + " (1/3)"
  const displayName2 = name + " (2/3)"
  const displayName3 = name + " (3/3)"

  const expectedPayment = {
    id,
    total,
    name,
    date,
    isDeleted: false,
    paymentContributions: [
      {
        displayName: displayName1,
        total: splitTotal1,
        date,
        paymentId: id,
      },
      {
        displayName: displayName2,
        total: splitTotal2,
        date: date2,
        paymentId: id,
      },
      {
        displayName: displayName3,
        total: splitTotal3,
        date: date3,
        paymentId: id,
      },
    ],
  }

  const payment = new PaymentBuilder()
    .setName(name)
    .setTotal(total)
    .setDate(date)
    .setSplitCount(3)
    .build()

  expect(payment).toEqual(expectedPayment)
})
