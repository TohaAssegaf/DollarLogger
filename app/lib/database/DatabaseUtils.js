import * as PaymentUtils from '~/app/lib/PaymentUtils'

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

  // If a payment was deleted locally or in DB, delete it.
  let deletedIds = getDeletedIds(localPayments, dbPayments)
  return syncedPayments.map(
    syncedPayment =>
      deletedIds.has(syncedPayment.id) ? PaymentUtils.setDeleted(syncedPayment) : syncedPayment)
}

function getDeletedIds(localPayments: Array<Payment>, dbPayments: Array<Payment>): Set<Number> {
  let deletedSet = new Set()
  for (const localPayment of localPayments) {
    if (localPayment.isDeleted) {
      deletedSet.add(localPayment.id)
    }
  }
  for (const dbPayment of dbPayments) {
    if (dbPayment.isDeleted) {
      deletedSet.add(dbPayment.id)
    }
  }
  return deletedSet
}
