import actions from '/app/actions'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Loading extends React.Component {
  static navigationOptions = {
    header: null // Hide header bar in this screen.
  }

  componentDidMount() {
    this.props.getBudgetTotal()
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    getBudgetTotal: () => {
      dispatch(actions.getBudgetTotal())
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(Loading)
