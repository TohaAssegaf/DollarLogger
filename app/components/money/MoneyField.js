import styles from './styles'
import {
  formatAmbiguousMoneyInput,
  formatMoneyCents
} from '/app/lib/MoneyFormatter'
import parseAmbiguousMoney from '/app/lib/parseAmbiguousMoney'
import React from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'

export default class MoneyField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
  }

  updateInput(input: string) {
    const formattedInput: string = formatAmbiguousMoneyInput(input)
    if (formattedInput !== input) {
      this.inputField.setNativeProps({
        text: formattedInput
      })
    }
    const total = parseAmbiguousMoney(formattedInput)
    if (total != this.state.total) {
      this.setState({
        total
      })
      this.props.onChange(total)
    }
  }

  formatFinalMoneyInput() {
    this.inputField.setNativeProps({
      text: formatMoneyCents(this.state.total)
    })
  }

  render() {
    return (
      <View style = {[styles.moneyField, this.props.moneyFieldStyles]} >
        <Text style = {[styles.currencyCode, this.props.currencyCodeStyles]} >$</Text>
        <TextInput
          style = {[styles.textInput, this.props.textInputStyles]}
          keyboardType = {"numeric"}
          onChangeText = {(input) => this.updateInput(input)}
          value = {this.state.input}
          onBlur = {() => this.formatFinalMoneyInput()}
          ref = {inputField => { this.inputField = inputField }} />
      </View>
    );
  }
}
