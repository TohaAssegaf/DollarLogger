import styles from './styles'
import SettingsCell from '~/app/components/settings/SettingsCell'
import * as SettingsUtils from '~/app/lib/settings/SettingsUtils'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR} from '~/app/config/colors'
import React from 'react';
import { FlatList, View } from 'react-native'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_TEXT_COLOR
  }

  renderSettingCell(setting: Setting) {
    return <SettingsCell text={setting.displayName} onTap={() => setting.action()} />
  }

  render() {
    return (
      <View style={styles.screen}>
        <FlatList
          data={SettingsUtils.createSettings(this.props.navigation)}
          keyExtractor={setting => setting.displayName}
          renderItem={({item}) => this.renderSettingCell(item)} />
      </View>
    );
  }
}
