import * as PaymentUtils from '~/app/lib/PaymentUtils'
import MockDate from 'mockdate'

it('filters current week payments correctly', () => {
  MockDate.set(new Date(2018, 3, 8))
  const expiredPayment = {
    id: 1,
    total: 1,
    name: "Expired test payment",
    date: new Date(2018, 3, 1)
  }
  const includedPayment1 = {
    id: 2,
    total: 2,
    name: "Included test payment",
    date: new Date(2018, 3, 2)
  }
  const includedPayment2 = {
    id: 3,
    total: 3,
    name: "Included test payment",
    date: new Date(2018, 3, 8)
  }
  const payments = [expiredPayment, includedPayment1, includedPayment2]

  const filteredPayments = PaymentUtils.filterCurrentWeekPayments(payments)

  expect(filteredPayments).toHaveLength(2)
  expect(filteredPayments[0]).toEqual(includedPayment1)
  expect(filteredPayments[1]).toEqual(includedPayment2)
})

it('calculates total spend correctly', () => {
  const total1 = 2
  const total2 = 3
  const totalSpend = total1 + total2
  const payment1 = {
    id: 1,
    total: total1,
    name: "Test payment",
    date: new Date(2018, 3, 2)
  }
  const payment2 = {
    id: 2,
    total: total2,
    name: "Test payment",
    date: new Date(2018, 3, 8)
  }
  const payments = [payment1, payment2]

  expect(PaymentUtils.getTotalSpend(payments)).toEqual(totalSpend)
})

it('calculates total spend on empty list', () => {
  expect(PaymentUtils.getTotalSpend([])).toEqual(0)
})
