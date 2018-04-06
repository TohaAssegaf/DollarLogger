import styles from './styles'
import MoneyField from '/app/components/money/MoneyField'
import React from 'react'
import { TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'

export default class AddPaymentForm extends React.Component {
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
      </View>
    );
  }
}
