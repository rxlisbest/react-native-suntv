import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import TabNavigator from 'react-native-tab-navigator'
import i18n from '../i18n'

import { Icon } from 'react-native-elements'
import { TabNavigatorComponentStyle as styles } from '../css/default'

export default class TabNavigatorComponent extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  static propProps = {
    navigation: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired
  }

  static defaultProps = {
    navigation: {},
    selectedTab: 'index'
  }

  onPress = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <View>
        <View style={{ height: 49 }}></View>
        <TabNavigator>
          <TabNavigator.Item
            title={i18n.t('tabNavigator.index')}
            selected={this.props.selectedTab === 'index'}
            renderIcon={() => <Icon name='home' />}
            renderSelectedIcon={() => <Icon
              name='home'
              color={styles.selectedStyle.color}
            />}
            selectedTitleStyle={styles.selectedStyle}
            badgeText="1"
            onPress={() => this.onPress('Index')}
          >
            <View>
              <Text>{i18n.t('tabNavigator.index')}</Text>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            title={i18n.t('tabNavigator.category')}
            selected={this.props.selectedTab === 'category'}
            renderIcon={() => <Icon name='apps' />}
            renderSelectedIcon={() => <Icon
              name='apps'
              color={styles.selectedStyle.color}
            />}
            selectedTitleStyle={styles.selectedStyle}
            badgeText="1"
            onPress={() => this.onPress('View')}
          >
            <View>
              <Text>{i18n.t('tabNavigator.category')}</Text>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            title={i18n.t('tabNavigator.discover')}
            selected={this.props.selectedTab === 'discover'}
            renderIcon={() => <Icon name='search' />}
            renderSelectedIcon={() => <Icon
              name='search'
              color={styles.selectedStyle.color}
            />}
            selectedTitleStyle={styles.selectedStyle}
            badgeText="1"
            onPress={() => this.onPress('View')}
          >
            <View>
              <Text>{i18n.t('tabNavigator.discover')}</Text>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            title={i18n.t('tabNavigator.user')}
            selected={this.props.selectedTab === 'user'}
            renderIcon={() => <Icon name='person' />}
            renderSelectedIcon={() => <Icon
              name='person'
              color={styles.selectedStyle.color}
            />}
            selectedTitleStyle={styles.selectedStyle}
            badgeText="1"
            badgeStyle={{ color: 'red' }}
            onPress={() => this.onPress('User')}
          >
            <View style={{ height: 0 }}>
              <Text>{i18n.t('tabNavigator.user')}</Text>
            </View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}
