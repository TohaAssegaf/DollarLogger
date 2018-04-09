export type Payment = {
  id: number,
  total: number,
  name: string,
  date: Date
}

export type PaymentState = {
  payments: Array<Payment>,
  isCreatingPayment: boolean,
  errorMessage: string,
  isFetching: boolean,
}
