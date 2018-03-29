import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
  },

  header: {
    color: "#222222",
    fontSize: 30
  },

  subtitle: {
    fontSize: 15,
    paddingBottom: 20,
  },

  currencyCode: {
    fontSize: 30
  },

  textInput: {
    fontSize: 30
  },

  button: {
    flexDirection: "row",
    paddingTop: 40
  },

  buttonInner: {
    flex: 1,
    paddingHorizontal: 40
  }
})