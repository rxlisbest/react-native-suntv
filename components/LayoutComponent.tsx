import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TabNavigatorComponent from './TabNavigatorComponent'
import ScreenUtils from '../utils/ScreenUtils'
import PropTypes from 'prop-types'

export default class LayoutComponent extends React.Component {

  static propProps = {
    navigation: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired
  }

  static defaultProps = {
    navigation: {},
    selectedTab: 'index'
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <TabNavigatorComponent navigation={this.props.navigation} selectedTab={this.props.selectedTab}></TabNavigatorComponent>
      </View>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    height: ScreenUtils.fullHeight,
    backgroundColor: '#EDEDED',
  }
});