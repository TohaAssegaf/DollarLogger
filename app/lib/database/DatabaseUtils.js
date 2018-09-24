export function syncPayments(
    localPayments: Array<Payment>, dbPayments: Array<Payment>): Array<Payment> {
  // Initialize synced payments list.
  let syncedPayments: Array<Payment> = []

  // Add all DB payments (source of truth, overriding any local edits for now).
  for (const dbPayment of dbPayments) {
    syncedPayments.push(dbPayment)
  }

  // Add all local payments that have not been synced for any reason.
  const dbIds = dbPayments.map(payment => payment.id)
  for (const localPayment of localPayments) {
    if (!dbIds.includes(localPayment.id)) {
      syncedPayments.push(localPayment)
    }
  }
  return syncedPayments
}
