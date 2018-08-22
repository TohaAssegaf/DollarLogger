import styles from './styles'
import actions from '~/app/actions'
import MoneyField from '~/app/components/money/MoneyField'
import { PRIMARY_BUTTON_COLOR } from '~/app/config/colors'
import React from 'react'
import { Button, Keyboard, TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'

export default class BasePaymentForm extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.payment) {
      const splitCount =
        this.props.payment.paymentContributions.length === 1
          ? ''
          : this.props.payment.paymentContributions.length.toString()
      this.state = {
        date: this.props.payment.date,
        total: this.props.payment.total,
        name: this.props.payment.name,
        splitCount,
      }
    } else {
      this.state = {
        date: new Date(),
        total: 0,
        name: '',
        splitCount: ''
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
    this.setState(Object.assign({}, this.state, { date: new Date(date) }))
  }

  setSplitCount(splitCount) {
    this.setState(Object.assign({}, this.state, { splitCount }))
  }

  onSubmit() {
    Keyboard.dismiss()
    // If splitCount field is empty string, set splitCount to 1.
    let splitCount = this.state.splitCount ? parseInt(this.state.splitCount) : 1
    this.props.onSubmit(this.state.total, this.state.name, this.state.date, splitCount)
  }

  render() {
    return (
      <View>
        <View style={styles.formCell}>
          <MoneyField
            onChange={total => this.setTotal(total)}
            textInputStyles={styles.moneyFieldTextInput}
            currencyCodeStyles={styles.moneyFieldCurrencyCode}
            defaultTotal={this.state.total}
          />
        </View>
        <View style={styles.formCell}>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setName(name)}
            placeholder='Name'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.name}
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
            confirmBtnText='OK'
            cancelBtnText='CANCEL'
            date={this.state.date}
            mode='date'
            placeholder='Date'
            format='MM/DD/YYYY'
            showIcon={false}
            onDateChange={date => this.setDate(date)}
          />
        </View>
        <View style={styles.formCell}>
          <TextInput
            style={styles.textInput}
            onChangeText={splitCount => this.setSplitCount(splitCount)}
            placeholder='Weekly installments (1 by default)'
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType='numeric'
            value={this.state.splitCount}
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
