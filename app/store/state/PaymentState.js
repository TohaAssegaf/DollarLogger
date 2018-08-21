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
  displayName: string,
  total: number,
  date: Date,
  paymentId: number,
}
