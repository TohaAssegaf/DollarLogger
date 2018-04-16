import Navigation from './components/navigation/Navigation'
import { STATUS_BAR_COLOR } from './config/colors'
import store from './store'
import React from 'react'
import { StatusBar, View } from 'react-native'
import {
    Provider
} from 'react-redux'

export default class App extends React.Component {
    render() {
        return (
          <Provider store = {store}>
            <View style={{ flex: 1}}>
              <StatusBar
                backgroundColor={STATUS_BAR_COLOR}
                barStyle="light-content"
              />
              <Navigation />
            </View>
          </Provider>
        );
    }
}
