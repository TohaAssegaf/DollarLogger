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
    height: 70,
    justifyContent: 'center',
  },

  textInput: {
    fontSize
  },

  datePicker: {
    width: 'auto',
  },

  dateTouchBody: {
    height: 'auto',
    alignItems: 'flex-start',
  },

  dateInput: {
    borderWidth: 0,
    height: 'auto',
    alignItems: 'flex-start',
  },

  dateText: {
    fontSize
  }
})
