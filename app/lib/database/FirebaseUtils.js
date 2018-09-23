import firebase from 'react-native-firebase'

const PAYMENTS_KEY = 'payments'
const VALUE_EVENT_TYPE = 'value'

export function fetchPayments(successCallback) {
  getPaymentsRef().once(VALUE_EVENT_TYPE, snapshot => successCallback(getPaymentsListFromSnapshot))
}

function getPaymentsListFromSnapshot(snapshot) {
  let payments = []

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
