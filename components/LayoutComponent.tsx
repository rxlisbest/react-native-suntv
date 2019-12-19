import React from 'react';
import {
  View,
} from 'react-native'
import TabNavigatorComponent from './TabNavigatorComponent'
import PropTypes from 'prop-types'
import { LayoutComponentStyle as styles } from '../css/default'

export default class LayoutComponent extends React.Component {

  static propProps = {
    navigation: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired,
  }

  static defaultProps = {
    navigation: {},
    selectedTab: 'index'
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBarStyle}></View>
        {this.props.children}
        <TabNavigatorComponent navigation={this.props.navigation} selectedTab={this.props.selectedTab}></TabNavigatorComponent>
      </View>
    )
  }
}
