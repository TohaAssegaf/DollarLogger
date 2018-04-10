import styles from './styles'
import PaymentCell from './PaymentCell'
import React from 'react'
import { FlatList } from 'react-native'

export default class PaymentList extends React.Component {
  keyExtractor(payment, index) {
    return payment.id
  }

  renderItem(payment) {
    return <PaymentCell onTap={() => this.props.onTapCell(payment)} payment={payment} />
  }

  render() {
    return (
      <FlatList
        data={this.props.payments}
        keyExtractor={(payment, index) => this.keyExtractor(payment, index)}
        renderItem={({item}) => this.renderItem(item)}
      />
    );
  }
}
