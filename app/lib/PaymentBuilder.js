import * as DateUtils from './DateUtils'

ONE_DAY = 86400000
ONE_WEEK = ONE_DAY * 7

export default class PaymentBuilder {
  id: number
  total: number
  name: string
  date: Date
  splitCount: number
  
  constructor(payment) {
    if (payment === undefined) {
      this.splitCount = 1
    } else {
      this.id = payment.id
      this.total = payment.total
      this.name = name
      this.date = payment.date
      this.splitCount = payment.paymentContributions.size()
    }
  }

  setId(id: number) {
    this.id = id
    return this
  }

  setTotal(total: number) {
    this.total = total
    return this
  }

  setName(name: string) {
    this.name = name
    return this
  }

  setDate(date: Date) {
    this.date = date
    return this
  }

  setSplitCount(splitCount: number) {
    this.splitCount = splitCount
    return this
  }

  build() {
    const paymentContributions = this.buildPaymentContributions()
    return {
      id: this.id,
      total: this.total,
      name: this.name,
      date: this.date,
      paymentContributions,
    }
  }

  buildPaymentContributions() {
    const totals = this.getPaymentContributionTotals()
    const dates = this.getPaymentContributionDates()
    return totals.map((total, i) => this.buildPaymentContribution(total, dates[i], i))
  }

  getPaymentContributionTotals() {
    const flooredValue = Math.floor(this.total / this.splitCount)
    // How many pennies are left when multiplying flooredValue by splitCount.
    const remainder = this.total % flooredValue
    let totals = []
    for (let i = 0; i < this.splitCount; i++) {
      // Evenly split the remaining cents across the first remainder contributions.
      const sparePenny = i < remainder ? 1 : 0
      totals.push(flooredValue + sparePenny)
    }
    return totals
  }

  getPaymentContributionDates() {
    // First date is always the provided date.
    let dates = [this.date]
    // Every subsequent date is the Monday of the successive weeks.
    for (let i = 1; i < this.splitCount; i++) {
      const dateIncrement = ONE_WEEK * i
      dates.push(DateUtils.getLastMonday(new Date(this.date.getTime() + dateIncrement)))
    }
    return dates
  }

  buildPaymentContribution(total: number, date: date, i: index) {
    return {
      displayName: this.buildDisplayName(i),
      total,
      date,
      paymentId: this.id,
    }
  }

  buildDisplayName(i: number) {
    // If only 1, then use same name. Otherwise, add a suffix showing installment number.
    return this.splitCount === 1 ? this.name : this.name + "(${i}/${this.splitCount})"
  }
}
