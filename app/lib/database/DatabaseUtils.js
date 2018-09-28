import * as PaymentUtils from '~/app/lib/PaymentUtils'

export function syncPayments(
    localPayments: Array<Payment>, dbPayments: Array<Payment>): Array<Payment> {
  // Initialize synced payments list.
  let syncedPayments: Array<Payment> = []

  // Create maps from id to payment.
  let localPaymentsMap = {}
  for (const localPayment of localPayments) {
    localPaymentsMap[localPayment.id] = localPayment
  }
  let dbPaymentsMap = {}
  for (const dbPayment of dbPayments) {
    dbPaymentsMap[dbPayment.id] = dbPayment
  }

  // Add all DB payments, deferring to local payments if they were updated more recently.
  for (let dbPayment of dbPayments) {
    // Not all DB payments have updateTimestamp yet
    // TODO(renzobautista): Clean up when all payments are migrated.
    const dbUpdateTimestamp = dbPayment.updateTimestamp ? dbPayment.updateTimestamp : dbPayment.id
    if (dbPayment.id in localPaymentsMap
        && localPaymentsMap[dbPayment.id].updateTimestamp > dbUpdateTimestamp) {
      syncedPayments.push(localPaymentsMap[dbPayment.id])
    } else {
      if (!('updateTimestamp' in dbPayment)) {
        dbPayment.updateTimestamp = dbUpdateTimestamp
      }
      syncedPayments.push(dbPayment)
    }
  }

  // Add all local payments that have not been synced for any reason.
  for (const localPayment of localPayments) {
    if (!(localPayment.id in dbPaymentsMap)) {
      syncedPayments.push(localPayment)
    }
  }

  // Regardless of if a payment was deleted locally or in DB, delete it.
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
