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

beforeEach(() => {
  mockDbPayments = []
});
