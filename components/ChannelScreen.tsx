import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  Button,
  ThemeProvider
} from 'react-native-elements'
import { Video } from 'expo-av'
import {
  ScreenOrientation
} from 'expo'
import { Tile } from 'react-native-elements'
import TabNavigatorComponent from './TabNavigatorComponent'
import i18n from '../i18n'
import ScreenUtils from '../utils/ScreenUtils'
import store from '../store/index'
import LayoutComponent from './LayoutComponent'
import { Card } from '@ant-design/react-native'
import { CaptchaInputComponentStyle as styles } from '../css/default'

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class ChannelScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView>
          <Card full>
            <Card.Header
              title="Full Column"
              thumbStyle={{ width: 30, height: 30 }}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra="this is extra"
            />
            <Card.Body>
              <View style={{ height: 42 }}>
                <Text style={{ marginLeft: 16 }}>Card Content</Text>
              </View>
            </Card.Body>
            <Card.Footer content="footer content" extra="footer extra content" />
          </Card>
        </ScrollView>
      </LayoutComponent>
    );
  }
}

