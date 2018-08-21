import styles from './styles'
import PaymentContributionCell from './PaymentContributionCell'
import React from 'react'
import { FlatList } from 'react-native'

export default class PaymentContributionList extends React.Component {
  keyExtractor(paymentContribution, index) {
    return index
  }

  renderItem(paymentContribution) {
    return <PaymentContributionCell
      onTap={() => this.props.onTapCell(paymentContribution)}
      paymentContribution={paymentContribution}
    />
  }

  render() {
    return (
      <FlatList
        data={this.props.paymentContributions}
        keyExtractor={(paymentContribution, index) => this.keyExtractor(paymentContribution, index)}
        renderItem={({item}) => this.renderItem(item)}
      />
    );
  }
}
