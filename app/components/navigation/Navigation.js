import * as Routes from '/app/config/Routes'
import { addListener } from '/app/lib/navigation'
import Home from '/app/screens/home/Home'
import UpdateBudget from '/app/screens/updatebudget/UpdateBudget'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

export const BaseNavigator = StackNavigator({
  UpdateBudget: { screen: UpdateBudget, path: Routes.UPDATE_BUDGET },
  Home: { screen: Home, path: Routes.HOME }
})

class Navigation extends React.Component {
  render() {
    return (
      <BaseNavigator navigation={{
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener
      }} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(Navigation)
