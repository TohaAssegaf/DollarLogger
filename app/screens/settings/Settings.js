import styles from './styles'
import actions from '~/app/actions'
import SettingsCell from '~/app/components/settings/SettingsCell'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '~/app/config/colors'
import * as Routes from '~/app/config/Routes'
import React from 'react';
import { Text, View } from 'react-native'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  navigateToUpdateBudget() {
    this.props.navigation.navigate(Routes.UPDATE_BUDGET, { isUpdateExistingBudget: true })
  }

  navigateToLogin() {
    this.props.navigation.navigate(Routes.LOGIN)
  }

  render() {
    return (
      <View style={styles.screen}>
        <SettingsCell
          text='Update budget'
          onTap={() => this.navigateToUpdateBudget()} />
          <SettingsCell
            text='Sign in to back-up your data'
            onTap={() => this.navigateToLogin()} />
      </View>
    );
  }
}
