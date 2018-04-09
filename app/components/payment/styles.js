import {
  THIN_BORDER_COLOR
} from '/app/config/colors'
import {
  StyleSheet
} from 'react-native';

const fontSize = 25
const generalSpacing = 20
const paddingHorizontal = generalSpacing

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
  },

  button: {
    marginTop: generalSpacing,
    marginHorizontal: generalSpacing,
  },

  paymentCell: {
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },

  paymentCellDate: {
    flex: 0.15,
    paddingHorizontal: generalSpacing,
  },

  paymentCellName: {
    flex: 0.7
  },

  paymentCellMoney: {
    flex: 0.15
  },

  paymentCellText: {
    fontSize: 16
  }
})
