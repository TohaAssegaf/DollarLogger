import styles from './styles'
import AddPaymentForm from '~/app/components/payment/AddPaymentForm'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR } from '~/app/config/colors'
import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class AddPayment extends React.Component {
  static navigationOptions = {
    title: 'Add Payment',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }
  render() {
    return (
      <View style={styles.screen}>
        <AddPaymentForm navigation={this.props.navigation}/>
      </View>
    );
  }
}

export default connect((state) => ({}))(AddPayment)
