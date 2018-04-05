import styles from './styles'
import HomeHeader from '/app/components/home/HomeHeader'
import HomeActionButton from '/app/components/home/HomeActionButton'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }
  render() {
    return (
      <View style={styles.screen}>
        <HomeHeader />
        <HomeActionButton />
      </View>
    );
  }
}

export default connect((state) => ({}))(Home)
