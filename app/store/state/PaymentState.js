export type Payment = {
  id: number,
  total: number,
  name: string,
  date: Date
}

export type PaymentState = {
  payments: Array<Payment>,
  isLoading: boolean,
  errorMessage: string,
}
