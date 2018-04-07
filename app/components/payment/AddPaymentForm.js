import styles from './styles'
import actions from '/app/actions'
import MoneyField from '/app/components/money/MoneyField'
import { PRIMARY_BUTTON_COLOR } from '/app/config/colors'
import React from 'react'
import { Button, Keyboard, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

class AddPaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      total: 0,
      name: '',
    }
  }

  setTotal(total) {
    this.setState(Object.assign({}, this.state, { total }))
  }

  setName(name) {
    this.setState(Object.assign({}, this.satet, { name }))
  }

  setDate(date) {
    this.setState(Object.assign({}, this.state, { date }))
  }

  submitForm() {
    Keyboard.dismiss()
    this.props.createPayment(this.state.total, this.state.name, this.state.date)

    // Temporary hack. This should check state with a componentDidUpdate for write to be complete.
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View>
        <View style={styles.formCell}>
          <MoneyField
            onChange={total => this.setTotal(total)}
            textInputStyles={styles.moneyFieldTextInput}
            currencyCodeStyles={styles.moneyFieldCurrencyCode}
          />
        </View>
        <View style={styles.formCell}>
          <TextInput
            style={styles.textInput}
            onChange={name => this.setName(name)}
            placeholder='Name'
          />
        </View>
        <View style={styles.formCell}>
          <DatePicker
            style={styles.datePicker}
            customStyles={{
              dateInput: styles.dateInput,
              dateText: styles.dateText,
              dateTouchBody: styles.dateTouchBody,
            }}
            date={this.state.date}
            mode='date'
            placeholder='Date'
            format='MM/DD/YYYY'
            showIcon={false}
            onDateChange={date => this.setDate(date)}
          />
        </View>
        <View style={styles.button}>
          <Button
              onPress={() => this.submitForm()}
              title='SAVE'
              color={PRIMARY_BUTTON_COLOR}
              accessibilityLabel='Save new payment'/>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPayment: (total, name, date) => {
      dispatch(actions.createPayment(total, name, date))
    }
  }
}

export default connect((state) => ({}), mapDispatchToProps)(AddPaymentForm)
