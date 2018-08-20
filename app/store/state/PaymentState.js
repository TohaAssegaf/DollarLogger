export type PaymentState = {
  payments: Array<Payment>,
  isLoading: boolean,
  errorMessage: string,
}

export type Payment = {
  id: number,
  total: number,
  name: string,
  date: Date,
  paymentContributions: Array<PaymentContribution>,
}

export type PaymentContribution = {
  total: number,
  date: Date,
}
