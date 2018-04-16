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
  settingsCell: {
    paddingHorizontal,
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 70,
    justifyContent: 'center',
  },
})
