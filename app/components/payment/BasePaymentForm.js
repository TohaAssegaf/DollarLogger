import styles from './styles'
import actions from '/app/actions'
import MoneyField from '/app/components/money/MoneyField'
import { PRIMARY_BUTTON_COLOR } from '/app/config/colors'
import React from 'react'
import { Button, Keyboard, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

export default class AddPaymentForm extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.payment) {
      this.state = {
        date: payment.date,
        total: payment.total,
        name: payment.name
      }
    } else {
      this.state = {
        date: new Date(),
        total: 0,
        name: '',
      }
    }
  }

  setTotal(total) {
    this.setState(Object.assign({}, this.state, { total }))
  }

  setName(name) {
    this.setState(Object.assign({}, this.state, { name }))
  }

  setDate(date) {
    this.setState(Object.assign({}, this.state, { date }))
  }

  onSubmit() {
    Keyboard.dismiss()
    this.props.onSubmit(this.state.total, this.state.name, this.state.date)
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
            onChangeText={name => this.setName(name)}
            placeholder='Name'
            underlineColorAndroid='rgba(0,0,0,0)'
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
              onPress={() => this.onSubmit()}
              title='SAVE'
              color={PRIMARY_BUTTON_COLOR}
              accessibilityLabel='Save payment'/>
        </View>
      </View>
    );
  }
}
