import {
  StyleSheet
} from 'react-native';

const fontSize = 20

export default StyleSheet.create({
  moneyField: {
    alignItems: 'center',
    flexDirection: "row"
  },

  currencyCode: {
    fontSize: fontSize
  },

  textInput: {
    fontSize: fontSize,
    minWidth: 100
  }
})
