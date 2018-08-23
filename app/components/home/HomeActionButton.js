import styles from './styles'
import { PRIMARY_BUTTON_COLOR } from '~/app/config/colors'
import React from 'react'
import { Text, View } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeActionButton extends React.Component {
  render() {
    return (
      <ActionButton buttonColor={PRIMARY_BUTTON_COLOR}>
        <ActionButton.Item
            buttonColor={PRIMARY_BUTTON_COLOR}
            title="Add Payment"
            onPress={() => this.props.addPaymentAction()}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
            buttonColor={PRIMARY_BUTTON_COLOR}
            title="Payment History"
            onPress={() => this.props.historyAction()}>
          <Icon name="md-analytics" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
