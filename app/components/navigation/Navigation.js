import * as Routes from '~/app/config/Routes'
import Home from '~/app/screens/home/Home'
import Loading from '~/app/screens/loading/Loading'
import AddPayment from '~/app/screens/payment/AddPayment'
import UpdatePayment from '~/app/screens/payment/UpdatePayment'
import UpdateBudget from '~/app/screens/updatebudget/UpdateBudget'
import Settings from '~/app/screens/settings/Settings'
import History from '~/app/screens/history/History'
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
  },
  [Routes.UPDATE_PAYMENT]: {
    screen: UpdatePayment,
    path: Routes.UPDATE_PAYMENT
  },
  [Routes.SETTINGS]: {
    screen: Settings,
    path: Routes.SETTINGS
  },
  [Routes.HISTORY]: {
    screen: History,
    path: Routes.HISTORY
  }
}, {
  initialRouteName: Routes.LOADING
})
