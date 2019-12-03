import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  requireNativeComponent,
  ScrollView,
} from 'react-native';
import {
  connect
} from "react-redux";
import {
  Avatar,
  ThemeProvider,
  ListItem
} from 'react-native-elements'
import {
  Audio,
  Video
} from 'expo-av';
import {
  Header
} from 'react-native-elements';
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import ImagePickerComponent from './VideoPickerComponent'
import { List, Picker, InputItem, Button, WhiteSpace } from '@ant-design/react-native'
import ScreenUtils from '../utils/ScreenUtils'


_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class ChannelCategoryCreateScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  render() {
    return (
      <LayoutComponent selectedTab='user'>
        <ScrollView>
          <List renderHeader={'基本'} style={{ marginTop: ScreenUtils.statusBarHeight }}>
            <InputItem
              clear
              placeholder="点击下方按钮该输入框会获取光标"
              ref={el => (this.inputRef = el)}
            >
              标题
            </InputItem>
            <Picker
              data={[]}
              cols={2}
            // value={}
            // onChange={this.onChange}
            >
              <List.Item
                arrow="horizontal"
              // onPress={this.onPress}
              >
                省市选择(异步加载)
              </List.Item>
            </Picker>
          </List>
          <Button type="primary">primary</Button>
        </ScrollView>
      </LayoutComponent>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'rgb(240, 161, 168)',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  list: {
    marginTop: 10,
  }
});