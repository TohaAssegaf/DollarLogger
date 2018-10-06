import * as PaymentUtils from '~/app/lib/PaymentUtils'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import MockDate from 'mockdate'

it('filters current week payments correctly', () => {
  MockDate.set(new Date(2018, 3, 8))
  const expiredPayment = {
    id: 1,
    total: 1,
    name: "Expired test payment",
    date: new Date(2018, 3, 1),
    paymentContributions: [
      {
        displayName: "Expired test payment",
        total: 1,
        date: new Date(2018, 3, 1)
      },
    ],
  }
  const includedPayment1 = {
    id: 2,
    total: 2,
    name: "Included test payment",
    date: new Date(2018, 3, 2),
    paymentContributions: [
      {
        displayName: "Included test payment",
        total: 2,
        date: new Date(2018, 3, 2)
      },
    ],
  }
  const includedPayment2 = {
    id: 3,
    total: 3,
    name: "Included test payment",
    date: new Date(2018, 3, 8),
    paymentContributions: [
      {
        displayName: "Included test payment",
        total: 3,
        date: new Date(2018, 3, 8)
      },
    ],
  }
  const payments = [expiredPayment, includedPayment1, includedPayment2]

  const filteredPayments = PaymentUtils.filterCurrentWeekPayments(payments)

  expect(filteredPayments).toHaveLength(2)
  expect(filteredPayments[0]).toEqual(includedPayment1)
  expect(filteredPayments[1]).toEqual(includedPayment2)
})

it('filters current week payment contributions correctly', () => {
  MockDate.set(new Date(2018, 3, 8))

  const expiredPaymentContribution = {
    displayName: "Expired test payment",
    total: 1,
    date: new Date(2018, 3, 1),
  }
  const includedPaymentContribution1 = {
    displayName: "Included test payment",
    total: 2,
    date: new Date(2018, 3, 2)
  }
  const includedPaymentContribution2 = {
    displayName: "Included test payment",
    total: 3,
    date: new Date(2018, 3, 8)
  }
  const expiredPayment = {
    id: 1,
    total: 1,
    name: "Expired test payment",
    date: new Date(2018, 3, 1),
    paymentContributions: [expiredPaymentContribution],
  }
  const includedPayment1 = {
    id: 2,
    total: 2,
    name: "Included test payment",
    date: new Date(2018, 3, 2),
    paymentContributions: [includedPaymentContribution1],
  }
  const includedPayment2 = {
    id: 3,
    total: 3,
    name: "Included test payment",
    date: new Date(2018, 3, 8),
    paymentContributions: [includedPaymentContribution2],
  }
  const paymentContributions = [
    expiredPaymentContribution,
    includedPaymentContribution1,
    includedPaymentContribution2,
  ]
  const payments = [expiredPayment, includedPayment1, includedPayment2]

  const includedPaymentContributions = PaymentUtils.filterCurrentWeekPaymentContributions(payments)

  expect(includedPaymentContributions).toHaveLength(2)
  expect(includedPaymentContributions[0]).toEqual(includedPaymentContribution1)
  expect(includedPaymentContributions [1]).toEqual(includedPaymentContribution2)
})

it('filters week payments for date correctly', () => {
  const date = new Date(2018, 3, 8)
  const expiredPayment = {
    id: 1,
    total: 1,
    name: "Expired test payment",
    date: new Date(2018, 3, 1),
    paymentContributions: [
      {
        displayName: "Expired test payment",
        total: 1,
        date: new Date(2018, 3, 1)
      },
    ],
  }
  const includedPayment1 = {
    id: 2,
    total: 2,
    name: "Included test payment",
    date: new Date(2018, 3, 2),
    paymentContributions: [
      {
        displayName: "Included test payment",
        total: 2,
        date: new Date(2018, 3, 2)
      },
    ],
  }
  const includedPayment2 = {
    id: 3,
    total: 3,
    name: "Included test payment",
    date: new Date(2018, 3, 8),
    paymentContributions: [
      {
        displayName: "Included test payment",
        total: 3,
        date: new Date(2018, 3, 8)
      },
    ],
  }
  const payments = [expiredPayment, includedPayment1, includedPayment2]

  const filteredPayments = PaymentUtils.filterPaymentsForWeek(payments, date)

  expect(filteredPayments).toHaveLength(2)
  expect(filteredPayments[0]).toEqual(includedPayment1)
  expect(filteredPayments[1]).toEqual(includedPayment2)
})

it('filters week payment contributions for date correctly', () => {
  const date = new Date(2018, 3, 8)

  const expiredPaymentContribution = {
    displayName: "Expired test payment",
    total: 1,
    date: new Date(2018, 3, 1),
  }
  const includedPaymentContribution1 = {
    displayName: "Included test payment",
    total: 2,
    date: new Date(2018, 3, 2)
  }
  const includedPaymentContribution2 = {
    displayName: "Included test payment",
    total: 3,
    date: new Date(2018, 3, 8)
  }
  const expiredPayment = {
    id: 1,
    total: 1,
    name: "Expired test payment",
    date: new Date(2018, 3, 1),
    paymentContributions: [expiredPaymentContribution],
  }
  const includedPayment1 = {
    id: 2,
    total: 2,
    name: "Included test payment",
    date: new Date(2018, 3, 2),
    paymentContributions: [includedPaymentContribution1],
  }
  const includedPayment2 = {
    id: 3,
    total: 3,
    name: "Included test payment",
    date: new Date(2018, 3, 8),
    paymentContributions: [includedPaymentContribution2],
  }
  const paymentContributions = [
    expiredPaymentContribution,
    includedPaymentContribution1,
    includedPaymentContribution2,
  ]
  const payments = [expiredPayment, includedPayment1, includedPayment2]

  const includedPaymentContributions = PaymentUtils.filterPaymentContributionsForWeek(
    payments, date)

  expect(includedPaymentContributions).toHaveLength(2)
  expect(includedPaymentContributions[0]).toEqual(includedPaymentContribution1)
  expect(includedPaymentContributions [1]).toEqual(includedPaymentContribution2)
})

it('calculates total spend correctly', () => {
  const total1 = 2
  const total2 = 3
  const totalSpend = total1 + total2
  const payment1 = {
    id: 1,
    total: total1,
    name: "Test payment",
    date: new Date(2018, 3, 2),
    paymentContributions: [
      {
        displayName: "Test payment",
        total: total1,
        date: new Date(2018, 3, 2)
      },
    ],
  }
  const payment2 = {
    id: 2,
    total: total2,
    name: "Test payment",
    date: new Date(2018, 3, 8),
    paymentContributions: [
      {
        total: total2,
        date: new Date(2018, 3, 8)
      },
    ],
  }
  const payments = [payment1, payment2]

  expect(PaymentUtils.getTotalSpend(payments)).toEqual(totalSpend)
})

it('calculates total spend on empty list', () => {
  expect(PaymentUtils.getTotalSpend([])).toEqual(0)
})

it('gets all sorted paymentContributions', () => {
  const payment1 =
    new PaymentBuilder()
      .setTotal(8)
      .setDate(new Date(2018, 9, 22))
      .setSplitCount(8)
      .setName('first payment with future installments')
      .build()
  const payment2 =
    new PaymentBuilder()
      .setTotal(8)
      .setDate(new Date(2018, 9, 23))
      .setName('second payment with no future installments')
      .build()
  const expectedPaymentContributions = [
    payment1.paymentContributions[0],
    payment2.paymentContributions[0],
    ...payment1.paymentContributions.slice(1)]
  expect(PaymentUtils.getSortedPaymentContributions([payment1, payment2]))
    .toEqual(expectedPaymentContributions)
})

it('deletes a payment', () => {
  const payment =
    new PaymentBuilder()
      .setTotal(8)
      .setDate(new Date(2018, 9, 22))
      .setSplitCount(8)
      .setName('first payment with future installments')
      .build()
  const expectedPayment = Object.assign({}, payment, { isDeleted: true })

  expect(PaymentUtils.setDeleted(payment)).toEqual(expectedPayment)
})
