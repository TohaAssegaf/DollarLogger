import {
  THIN_BORDER_COLOR
} from '~/app/config/colors'
import {
  StyleSheet
} from 'react-native';

const fontSize = 20

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    borderBottomColor: THIN_BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row"
  },

  cell: {
    height: 100,
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  amount: {
    fontSize: 32,
    color: 'black'
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})