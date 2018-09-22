import * as DateUtils from './DateUtils'

const ONE_DAY = 86400000
const ONE_WEEK = ONE_DAY * 7

export default class PaymentBuilder {
  id: number
  total: number
  name: string
  date: Date
  splitCount: number

  constructor(payment: Payment) {
    if (payment === undefined) {
      this.splitCount = 1
    } else {
      this.id = payment.id
      this.total = payment.total
      this.name = payment.name
      this.date = payment.date
      this.splitCount = payment.paymentContributions.length
    }
  }

  setId(id: number): PaymentBuilder {
    this.id = id
    return this
  }

  setTotal(total: number): PaymentBuilder {
    this.total = total
    return this
  }

  setName(name: string): PaymentBuilder {
    this.name = name
    return this
  }

  setDate(date: Date): PaymentBuilder {
    this.date = date
    return this
  }

  setSplitCount(splitCount: number): PaymentBuilder {
    this.splitCount = splitCount
    return this
  }

  build(): Payment {
    this.reservePaymentId()
    const paymentContributions = this.buildPaymentContributions()
    return {
      id: this.id,
      total: this.total,
      name: this.name,
      date: this.date,
      paymentContributions,
    }
  }

  reservePaymentId() {
    // TODO(renzobautista): Separate ID generation into a new class so it can be mocked
    if (!this.id) {
      this.id = Date.now()
    }
  }

  buildPaymentContributions(): Array<PaymentContribution> {
    const totals = this.getPaymentContributionTotals()
    const dates = this.getPaymentContributionDates()
    return totals.map((total, i) => this.buildPaymentContribution(total, dates[i], i))
  }

  getPaymentContributionTotals(): Array<number> {
    const flooredValue = Math.floor(this.total / this.splitCount)
    // How many pennies are left when multiplying flooredValue by splitCount.
    const remainder = this.total % (flooredValue * this.splitCount)
    let totals = []
    for (let i = 0; i < this.splitCount; i++) {
      // Evenly split the remaining cents across the first remainder contributions.
      const spareCent = i < remainder ? 1 : 0
      totals.push(flooredValue + spareCent)
    }
    return totals
  }

  getPaymentContributionDates(): Array<Date> {
    // First date is always the provided date.
    let dates = [this.date]
    // Every subsequent date is the Monday of the successive weeks.
    for (let i = 1; i < this.splitCount; i++) {
      const dateIncrement = ONE_WEEK * i
      dates.push(DateUtils.getLastMonday(new Date(this.date.getTime() + dateIncrement)))
    }
    return dates
  }

  buildPaymentContribution(total: number, date: date, i: index): PaymentContribution {
    return {
      displayName: this.buildDisplayName(i),
      total,
      date,
      paymentId: this.id,
    }
  }

  buildDisplayName(i: number): string {
    // If only 1, then use same name. Otherwise, add a suffix showing installment number.
    // Installment number needs to be incremented by 1 because it is 0-indexed.
    return this.splitCount === 1 ? this.name : this.name + ` (${i + 1}/${this.splitCount})`
  }
}
