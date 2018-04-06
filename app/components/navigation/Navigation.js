import * as Routes from '/app/config/Routes'
import Home from '/app/screens/home/Home'
import Loading from '/app/screens/loading/Loading'
import AddPayment from '/app/screens/payment/AddPayment'
import UpdateBudget from '/app/screens/updatebudget/UpdateBudget'
import React from 'react'
import {
  StackNavigator
} from 'react-navigation'

export default StackNavigator({
  [Routes.UPDATE_BUDGET]: {
    screen: UpdateBudget,
    path: Routes.UPDATE_BUDGET
  },
  [Routes.HOME]: {
    screen: Home,
    path: Routes.HOME
  },
  [Routes.LOADING]: {
    screen: Loading,
    path: Routes.LOADING
  },
  [Routes.ADD_PAYMENT]: {
    screen: AddPayment,
    path: Routes.ADD_PAYMENT
  }
}, {
  initialRouteName: Routes.LOADING
})
