import * as BudgetModel from '~/app/store/models/budget'

let mockStorage = {}
jest.mock('react-native', () => ({
  AsyncStorage: {
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
}))

describe('BudgetModel', () => {
  beforeEach(() => {
    mockStorage = {}
  })

  it('should return null if nothing is in storage', () => {
    BudgetModel.getTotal().then(total => expect(total).toEqual(null))
  })

  it('should successfully set budget total', () => {
    const expectedTotal = 10000
    BudgetModel.setTotal(expectedTotal).then(
      () => BudgetModel.getTotal().then(total => expect(total).toEqual(expectedTotal)))

  })
})
