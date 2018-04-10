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
    if (this.props.default) {
      this.state = {
        total: this.props.default,
        input: formatMoneyCents(this.props.default)
      }
    } else {
      this.state = {
        total: 0,
        input: '',
      }
    }
  }

  updateInput(input: string) {
    const formattedInput: string = formatAmbiguousMoneyInput(input)
    if (formattedInput !== this.state.input) {
      const total = parseAmbiguousMoney(formattedInput)
      this.setState(Object.assign({}, this.state, { input: formattedInput, total }))
      this.props.onChange(total)
    }
  }

  formatFinalMoneyInput() {
    this.setState(Object.assign({}, this.state, { input: formatMoneyCents(this.state.total) }))
  }

  render() {
    return (
      <View style = {[styles.moneyField, this.props.moneyFieldStyles]} >
        <Text style = {[styles.currencyCode, this.props.currencyCodeStyles]} >$</Text>
        <TextInput
          style = {[styles.textInput, this.props.textInputStyles]}
          keyboardType = {"numeric"}
          onChangeText = {(input) => this.updateInput(input)}
          value = { this.state.input }
          onBlur = {() => this.formatFinalMoneyInput()}
          underlineColorAndroid='rgba(0,0,0,0)'
          ref = {inputField => { this.inputField = inputField }} />
      </View>
    );
  }
}
