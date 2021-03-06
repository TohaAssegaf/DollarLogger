import actions from '~/app/actions'
import * as Routes from '~/app/config/Routes'
import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import React from 'react';
import { Text, View } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'

class Loading extends React.Component {
  static navigationOptions = {
    header: null // Hide header bar in this screen.
  }

  componentDidMount() {
    this.props.getBudgetTotal()
    AuthUtils.onAuthStateChanged(user => {
      if (AuthUtils.isLoggedIn()) {
        this.props.syncPayments()
      } else {
        this.props.getPayments()
      }
    })
  }

  componentDidUpdate() {
    if (this.props.budget.isFetchComplete && !this.props.payment.isLoading) {
      let navigationAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Routes.HOME })]
      })
      if (this.props.budget.total === null) {
        navigationAction = StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: Routes.HOME }),
            NavigationActions.navigate({ routeName: Routes.UPDATE_BUDGET })
          ]
        })
      }
      this.props.navigation.dispatch(navigationAction)
    }
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: state.budget,
    payment: state.payment,
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    getBudgetTotal: () => {
      dispatch(actions.getBudgetTotal())
    },
    getPayments: () => {
      dispatch(actions.getPayments())
    },
    syncPayments: () => {
      dispatch(actions.syncPayments())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
