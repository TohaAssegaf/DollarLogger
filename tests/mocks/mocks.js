import { StackNavigator } from 'react-navigation'

let mockDbPayments = []
let mockUser = {
  currentUser: {
    uid: 1
  }
}
let onAuthStateChangedListeners = []
jest.mock('react-native-firebase', () => {
  return {
    auth: jest.fn(() => {
      return {
        currentUser: mockUser,
        signOut: jest.fn(() => {
          mockUser = null
          for (const listener of onAuthStateChangedListeners) {
            listener(mockUser)
          }
        }),
        signInWithCredential: jest.fn(() => {
          mockUser = {
            currentUser: {
              uid: 1
            }
          }
          for (const listener of onAuthStateChangedListeners) {
            listener(mockUser)
          }
        }),
        onAuthStateChanged: jest.fn((listener) => {
          onAuthStateChangedListeners.push(listener)
        })
      }
    }),
    database: jest.fn(() => {
      return {
        ref: jest.fn(() => {
          return {
            child: jest.fn(() => {
              return {
                child: jest.fn((paymentId) => {
                  return {
                    set: jest.fn((payment) => {
                      return new Promise((resolve, reject) => {
                        // If payment does not exist yet, add it. Otherwise, update it.
                        if (!mockDbPayments.find(
                            mockPaymentSnap => mockPaymentSnap.toJSON().id === payment.id)) {
                          mockDbPayments.push(createFakePaymentSnapshot(payment))
                        } else {
                          mockDbPayments = mockDbPayments.map(
                            mockPaymentSnap =>
                              mockPaymentSnap.toJSON().id === payment.id
                                ? createFakePaymentSnapshot(payment)
                                : mockPaymentSnap)

                        }
                        resolve(payment)
                      })
                    })
                  }
                }),
                once: jest.fn(() => {
                  return new Promise((resolve, reject) => {
                    resolve(mockDbPayments)
                  })
                }),
                set: jest.fn((payments) => {
                  return new Promise((resolve, reject) => {
                    mockDbPayments = []
                    for (const paymentId in payments) {
                      mockDbPayments.push(createFakePaymentSnapshot(payments[paymentId]))
                    }
                    resolve(mockDbPayments)
                  })
                })
              }
            })
          }
        })
      }
    })
  }
})

function createFakePaymentSnapshot(payment) {
  return { toJSON: () => payment }
}

jest.mock('../../app/store/models/budget', () => {
  let total: number = 0
  return {
    setTotal: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        total = value
        resolve(value)
      })
    }),
    getTotal: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(total);
      })
    })
  }
})

let mockStorage = {}
jest.mock('../../app/lib/AsyncStorage', () => ({
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        mockStorage[item] = value;
        resolve(value);
      });
    }),
    getItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        resolve(mockStorage[item]);
      });
    }),
  }
))

jest.mock('../../app/lib/auth/FBAuth', () => ({
  logout: jest.fn()
}))

beforeEach(() => {
  mockDbPayments = []
  mockUser = {
    currentUser: {
      uid: 1
    }
  }
  onAuthStateChangedListeners = []
  mockStorage = {}
});
