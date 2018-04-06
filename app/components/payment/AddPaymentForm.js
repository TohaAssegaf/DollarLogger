import styles from './styles'
import MoneyField from '/app/components/money/MoneyField'
import React from 'react'
import { TextInput, View } from 'react-native'

export default class AddPaymentForm extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.formCell}>
          <MoneyField
            onChange={total => console.log(total)}
            textInputStyles={styles.moneyFieldTextInput}
            currencyCodeStyles={styles.moneyFieldCurrencyCode}
          />
        </View>
        <View style={styles.formCell}>
          <TextInput
            style={styles.textInput}
            onChange={name => console.log(name)}
            placeholder={"Name"}
          />
        </View>
      </View>
    );
  }
}
