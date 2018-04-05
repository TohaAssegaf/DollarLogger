import reducer from '/app/reducers'
import {
    createStore,
    applyMiddleware
} from 'redux'
import {
    createLogger
} from 'redux-logger'
import thunkMiddleware from 'redux-thunk' 
const loggerMiddleware = createLogger() 
export default createStore(
    reducer,
    applyMiddleware(
        loggerMiddleware, // neat middleware that logs actions
        thunkMiddleware // lets us dispatch() functions
    )
)