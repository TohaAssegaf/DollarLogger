import {
  combineReducers
} from 'redux'
import budget from './budget'
import payment from './payment'

export default combineReducers({
  budget,
  payment
})