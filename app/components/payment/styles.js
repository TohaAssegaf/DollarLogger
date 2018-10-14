import {
  THIN_BORDER_COLOR
} from '~/app/config/colors'
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
    fontSize,
    flex: 1,
  },

  formCell: {
    paddingHorizontal,
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 70,
    justifyContent: 'center',
  },

  textInput: {
    fontSize,
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

  paymentContributionCell: {
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },

  paymentContributionCellDate: {
    flex: 0.15,
    paddingHorizontal: generalSpacing,
    alignItems: 'flex-start'
  },

  paymentContributionCellName: {
    flex: 0.6,
  },

  paymentContributionCellMoney: {
    flex: 0.25,
    alignItems: 'flex-end',
    paddingRight: generalSpacing,
  },

  paymentContributionCellText: {
    fontSize: 16
  },

  deletePaymentButton: {
    marginHorizontal: generalSpacing
  },

  paymentContributionList: {
    flex: 1,
  }
})
