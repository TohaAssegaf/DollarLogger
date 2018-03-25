import styles from './styles'
import MoneyField from '/app/components/money/MoneyField'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default class UpdateBudget extends React.Component {
  static navigationOptions = {
    header: null // Hide header bar in this screen.
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.header}>What is your weekly budget?</Text>
        <Text style={styles.subtitle}>(Don't worry, you can change this later)</Text>
        <MoneyField textInputStyles={styles.textInput} currencyCodeStyles={styles.currencyCode} />
        <View style={styles.button}>
          <View style={styles.buttonInner}>
            <Button
                onPress={() => {}}
                title="SUBMIT"
                color={"#6A1B9A"}
                accessibilityLabel="Update weekly budget"/>            
          </View>
        </View>
      </View>
    );
  }
}
