import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class Home extends React.Component {
  render() {
    return (
      <View>
        <Text>Placeholder for home screen</Text>
      </View>
    );
  }
}

export default connect((state) => ({}))(Home)
