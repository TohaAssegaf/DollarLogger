import * as Routes from '/app/config/Routes'
import styles from './styles'
import actions from '/app/actions'
import MoneyField from '/app/components/money/MoneyField'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'

class UpdateBudget extends React.Component {
  static navigationOptions = {
    header: null // Hide header bar in this screen.
  }

  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
  }

  updateTotal(total: number) {
    this.setState({ total })
  }

  submitForm() {
    this.props.updateBudgetTotal(this.state.total)
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.header}>What is your weekly budget?</Text>
        <Text style={styles.subtitle}>(Don't worry, you can change this later)</Text>
        <MoneyField
          textInputStyles={styles.textInput}
          currencyCodeStyles={styles.currencyCode}
          onChange={(total) => this.updateTotal(total)}/>
        <View style={styles.button}>
          <View style={styles.buttonInner}>
            <Button
                onPress={() => this.submitForm()}
                title="SUBMIT"
                color={"#6A1B9A"}
                accessibilityLabel="Update weekly budget"/>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: state.budget
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    updateBudgetTotal: total => {
      dispatch(actions.setBudgetTotal(total))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBudget)
