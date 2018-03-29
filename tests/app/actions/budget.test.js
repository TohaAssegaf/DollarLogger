import actions from '/app/actions'
import {
  SET_BUDGET_TOTAL_REQUEST,
  SET_BUDGET_TOTAL_SUCCESS,
  SET_BUDGET_TOTAL_FAILURE,
  GET_BUDGET_TOTAL_REQUEST,
  GET_BUDGET_TOTAL_SUCCESS,
  GET_BUDGET_TOTAL_FAILURE,
  SetBudgetTotalRequestAction,
  SetBudgetTotalSuccessAction,
  SetBudgetTotalFailureAction,
  GetBudgetTotalRequestAction,
  GetBudgetTotalSuccessAction,
  GetBudgetTotalFailureAction,
} from '/app/actions/ActionTypes'
import { BUDGET_ASYNC_STORAGE_KEY } from '/app/config/storage'
import BudgetModel from '/app/store/models/budget'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.mock('../../../app/store/models/budget', () => {
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
      BudgetModel.getTotal().then(storedTotal => {
        expect(storedTotal.toEqual(total))
      })
    })
  })

  it('should dispatch request and failure for unsuccessful set budget total', () => {
    const errorMessage = "Test error"
    BudgetModel.setTotal.mockImplementation((item, value) => {
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

  it('should create an action to get budget total request', () => {
    const expectedAction: GetBudgetTotalRequestAction = {
      type: GET_BUDGET_TOTAL_REQUEST,
    }
    expect(actions.getBudgetTotalRequest()).toEqual(expectedAction)
  })

  it('should create an action for get budget total request success', () => {
    const total: number = 10000
    const expectedAction: GetBudgetTotalSuccessAction = {
      type: GET_BUDGET_TOTAL_SUCCESS,
      total
    }
    expect(actions.getBudgetTotalSuccess(total)).toEqual(expectedAction)
  })

  it('should create an action for get budget total failure', () => {
    const errorMessage: string = "Test error"
    const expectedAction: GetBudgetTotalFailureAction = {
      type: GET_BUDGET_TOTAL_FAILURE,
      errorMessage
    }
    expect(actions.getBudgetTotalFailure(errorMessage)).toEqual(expectedAction)
  })

  it('should dispatch request and success for successful budget fetch', () => {
    const total: number = 10000
    const expectedActions = [actions.getBudgetTotalRequest(), actions.getBudgetTotalSuccess(total)]
    const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" }})

    store.dispatch(actions.getBudgetTotal()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch request and failure for unsuccessful budget fetch', () => {
    const errorMessage = "Test error"
    BudgetModel.setTotal.mockImplementation((item, value) => {
      return new Promise((resolve, reject) => {
        reject({ message: errorMessage })
      })
    })
    const total: number = 10000
    const expectedActions = [
      actions.getBudgetTotalRequest(),
      actions.getBudgetTotalFailure(errorMessage)
    ]
    const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" }})

    store.dispatch(actions.setBudgetTotal(total)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
