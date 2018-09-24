let mockDbPayments = []
let mockUser = {
  currentUser: {
    uid: 1
  }
}
jest.mock('react-native-firebase', () => {
  return {
    auth: jest.fn(() => {
      return {
        currentUser: mockUser
      }
    }),
    database: jest.fn(() => {
      return {
        ref: jest.fn(() => {
          return {
            child: jest.fn(() => {
              return {
                once: jest.fn(() => {
                  return new Promise((resolve, reject) => {
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

let mockPayments = []
jest.mock('../../app/store/models/payment', () => {
  return {
    addPayment: jest.fn((payment) => {
      return new Promise((resolve, reject) => {
        mockPayments.push(payment)
        resolve(mockPayments)
      })
    }),
    updatePayment: jest.fn((payment) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.map(
          storedPayment => storedPayment.id === payment.id ? payment : storedPayment)
        resolve(mockPayments)
      })
    }),
    deletePayment: jest.fn((paymentId) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.filter(
          storedPayment => storedPayment.id !== paymentId)
        resolve(mockPayments)
      })
    }),
    getPayments: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(mockPayments);
      })
    }),
    syncPayments: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(mockPayments);
      })
    })
  }
})

beforeEach(() => {
  mockDbPayments = []
  mockPayments = []
});
