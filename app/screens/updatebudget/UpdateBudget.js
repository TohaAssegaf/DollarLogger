import * as Routes from '/app/config/Routes'
import styles from './styles'
import actions from '/app/actions'
import {
  HEADER_BACKGROUND_COLOR,
  HEADER_TEXT_COLOR,
  PRIMARY_BUTTON_COLOR
} from '/app/config/colors'
import MoneyField from '/app/components/money/MoneyField'
import React from 'react'
import { Button, Keyboard, StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'

class UpdateBudget extends React.Component {
  static navigationOptions = ({ navigation}) => {
    if (!navigation.getParam('isUpdateExistingBudget')) {
      return {
        header: null // Hide header bar.
      }
    } else {
      return {
        title: 'Update Budget',
        headerStyle: {
          backgroundColor: HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: HEADER_TEXT_COLOR,
      }
    }
  }

  constructor(props) {
    super(props)
    if (this.props.budget.total != null) {
      this.state = {
        total: this.props.budget.total
      }
    } else {
      this.state = {
        total: 0
      }
    }
  }

  updateTotal(total: number) {
    this.setState({ total })
  }

  submitForm() {
    Keyboard.dismiss()
    this.props.updateBudgetTotal(this.state.total)

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  isUpdateExistingBudget() {
    return this.props.navigation.getParam('isUpdateExistingBudget')
  }

  render() {
    return (
      <View style={styles.screen}>
        {!this.isUpdateExistingBudget()
         && <StatusBar backgroundColor='white' barStyle='dark-content' />}
        <Text style={styles.header}>What is your weekly budget?</Text>
        {!this.isUpdateExistingBudget()
          && <Text style={styles.subtitle}>(Don't worry, you can change this later)</Text>}
        <MoneyField
          defaultTotal={this.props.budget.total === null ? 0 : this.props.budget.total}
          moneyFieldStyles={styles.moneyField}
          textInputStyles={styles.textInput}
          currencyCodeStyles={styles.currencyCode}
          onChange={(total) => this.updateTotal(total)}/>
        <View style={styles.button}>
          <View style={styles.buttonInner}>
            <Button
                onPress={() => this.submitForm()}
                title="SUBMIT"
                color={PRIMARY_BUTTON_COLOR}
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
