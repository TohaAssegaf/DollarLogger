import Navigation from './components/navigation/Navigation'
import store from './store'
import React from 'react'
import {
    Provider
} from 'react-redux'

export default class App extends React.Component {
    render() {
        return ( <
            Provider store = {
                store
            } >
            <
            Navigation / >
            <
            /Provider>
        );
    }
}