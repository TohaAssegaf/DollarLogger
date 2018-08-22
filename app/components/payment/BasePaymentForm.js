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
      this.state = {
        date: this.props.payment.date,
        total: this.props.payment.total,
        name: this.props.payment.name,
        splitCount: this.props.payment.splitCount,
      }
    } else {
      this.state = {
        date: new Date(),
        total: 0,
        name: '',
        splitCount: 0
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
    // If splitCount is 0, set it to 1.
    let splitCount = this.state.splitCount ? this.state.splitCount : 1
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
            onChangeText={splitCount => this.setSplitCount(parseInt(splitCount))}
            placeholder='# of weekly installments'
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType='numeric'
            value={this.state.splitCount == 0 ? '' : this.state.splitCount.toString()}
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
