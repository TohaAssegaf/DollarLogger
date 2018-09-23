import firebase from 'react-native-firebase'

const PAYMENTS_KEY = 'payments'
const VALUE_EVENT_TYPE = 'value'

/** Fetch payments from firebase, then run given callback. */
export function fetchPayments(successCallback: Array<Payment> => void) {
  getPaymentsRef().once(
    VALUE_EVENT_TYPE, snapshot => successCallback(getPaymentsListFromSnapshot(snapshot)))
}

/** Given the payments snapshot, convert it to a list of Payments. */
function getPaymentsListFromSnapshot(snapshot): Array<Payment> {
  let payments: Array<Payment> = []

  // Add each child snapshot to payments list.
  snapshot.forEach(child => payments.push(child.toJSON()))

  return payments
}

function getUserRef() {
  return firebase.database.ref(firebase.auth.currentUser.uid)
}

function getPaymentsRef() {
  return getUserRef().child(PAYMENTS)
}
