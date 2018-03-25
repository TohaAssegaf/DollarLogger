import {
  StyleSheet
} from 'react-native';

const fontSize = 20

export default StyleSheet.create({
  moneyField: {
    alignItems: 'center',
    borderBottomColor: '#222222',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
