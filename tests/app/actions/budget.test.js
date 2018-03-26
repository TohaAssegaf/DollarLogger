import actions from '/app/actions'
import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  SetBudgetTotalRequestAction,
  SetBudgetTotalSuccessAction,
  SetBudgetTotalFailureAction,
} from '/app/actions/ActionTypes'
import { BUDGET_ASYNC_STORAGE_KEY } from '/app/config/storage'
import { AsyncStorage } from 'react-native'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.mock('AsyncStorage', () => {
  const mockStorage = {}
  return {
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        mockStorage[item] = value
        resolve(value)
      })
    }),
    getItem: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(mockStorage[item]);
      })
    })
  }
})
 
describe('BudgetActions', () => {
  it('should create an action to set new budget total request', () => {
    const expectedAction: SetBudgetTotalRequestAction = {
      type: SET_BUDGET_TOTAL_REQUEST,
    }
    expect(actions.setBudgetTotalRequest()).toEqual(expectedAction)
  })

  it('should create an action to set new budget total request success', () => {
    const total: number = 10000
    const expectedAction: SetBudgetTotalSuccessAction = {
      type: SET_BUDGET_TOTAL_SUCCESS,
      total
    }
    expect(actions.setBudgetTotalSuccess(total)).toEqual(expectedAction)
  })

  it('should create an action to set new budget total failure', () => {
    const errorMessage: string = "Test error"
    const expectedAction: SetBudgetTotalFailureAction = {
      type: SET_BUDGET_TOTAL_FAILURE,
      errorMessage
    }
    expect(actions.setBudgetTotalFailure(errorMessage)).toEqual(expectedAction)
  })

  it('should dispatch request and success for successful set budget total', () => {
    const total: number = 10000
    const expectedActions = [actions.setBudgetTotalRequest(), actions.setBudgetTotalSuccess(total)]
    const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" }})

    store.dispatch(actions.setBudgetTotal(total)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      AsyncStorage.getItem(BUDGET_ASYNC_STORAGE_KEY).then(storedTotal => {
        expect(storedTotal.toEqual(total))
      })
    })
  })

  it('should dispatch request and failure for unsuccessful set budget total', () => {
    const errorMessage = "Test error"
    AsyncStorage.setItem.mockImplementation((item, value) => {
      return new Promise((resolve, reject) => {
        reject({ message: errorMessage })
      })
    })
    const total: number = 10000
    const expectedActions = [
      actions.setBudgetTotalRequest(),
      actions.setBudgetTotalFailure(errorMessage)
    ]
    const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" }})

    store.dispatch(actions.setBudgetTotal(total)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
