import actions from '~/app/actions'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import store from '~/app/store'
import firebase from 'react-native-firebase'

const PAYMENTS_KEY = 'payments'
const VALUE_EVENT_TYPE = 'value'

/** Fetch payments from firebase. */
export function fetchPayments(): Promise<Array<Payment>> {
  return getPaymentsRef()
    .once(VALUE_EVENT_TYPE)
    .catch(error => {
      store.dispatch(actions.fetchPaymentsFailure())
      throw error
    })
    .then(snapshot => getPaymentsListFromSnapshot(snapshot))
    .then(payments => {
      store.dispatch(actions.fetchPaymentsSuccess())
      return payments
    })
}

/** Push payments to firebase. */
export function pushPayments(payments: Array<Payment>): void {
  if (AuthUtils.isLoggedIn()) {
    getPaymentsRef()
      .set(convertToFirebaseObject(payments))
      .catch(error => store.dispatch(actions.pushPaymentsFailure()))
  }
}

/** Push single payment to firebase. */
export function pushPayment(payment: Payment): void {
  if (AuthUtils.isLoggedIn()) {
    getPaymentRef(payment)
      .set(payment)
      .catch(error => store.dispatch(actions.pushPaymentsFailure()))
  }
}

/** Given the payments snapshot, convert it to a list of Payments. */
function getPaymentsListFromSnapshot(snapshot): Array<Payment> {
  let payments: Array<Payment> = []

  // Add each child snapshot to payments list.
  snapshot.forEach(child => payments.push(parsePayment(child.toJSON())))

  return payments
}

/** Need to parse all date fields into actual Date objects instead of numbers. */
function parsePayment(payment) {
  let paymentContributions = payment.paymentContributions.map(
    paymentContribution =>
      Object.assign({}, paymentContribution, { date: new Date(paymentContribution.date) }))
  return Object.assign({}, payment, { date: new Date(payment.date), paymentContributions })
}

/** Converts payments list to a map for Firebase storage. */
function convertToFirebaseObject(payments: Array<Payment>) {
  let firebaseObject = {}
  for (const payment of payments) {
    firebaseObject[payment.id] = payment
  }
  return firebaseObject
}

function getUserRef() {
  return firebase.database().ref(firebase.auth().currentUser.uid)
}

function getPaymentsRef() {
  return getUserRef().child(PAYMENTS_KEY)
}

function getPaymentRef(payment: Payment) {
  return getPaymentsRef().child(payment.id)
}
