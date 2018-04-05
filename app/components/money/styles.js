import {
  THIN_BORDER_COLOR
} from '/app/config/colors'
import {
  StyleSheet
} from 'react-native';

const fontSize = 20

export default StyleSheet.create({
  moneyField: {
    alignItems: 'center',
    borderBottomColor: THIN_BORDER_COLOR,
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