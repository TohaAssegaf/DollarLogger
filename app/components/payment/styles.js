import {
  THIN_BORDER_COLOR
} from '/app/config/colors'
import {
  StyleSheet
} from 'react-native';

const fontSize = 30
const paddingHorizontal = 20

export default StyleSheet.create({
  moneyFieldCurrencyCode: {
    fontSize
  },

  moneyFieldTextInput: {
    fontSize
  },

  formCell: {
    paddingHorizontal,
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  textInput: {
    fontSize
  }
})
