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
  Button,
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
import TabNavigatorComponent from './TabNavigatorComponent'
import i18n from '../i18n'
import screen from '../utils/screen'
import { ImagePicker } from '@ant-design/react-native'

import * as picker from "react-native-image-picker"
// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

const list = [
  {
    title: i18n.t('user.family'),
    icon: 'people'
  },
  {
    title: i18n.t('user.category'),
    icon: 'apps'
  },
  {
    title: i18n.t('user.channel'),
    icon: 'videocam'
  }
]

export default class ChannelCreateScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <Text>123</Text>
        </View>
        <ImagePicker
          // files={files}
          // selectable={files.length < 2}
          // onChange={this.onChange}
          // onImageClick={(index, files) => {
          //   console.log(files[index].url)
          // }}
          // onAddImageClick={
          //   this.choosePicker
          // }
        />

        <ScrollView>
          <View style={styles.list}>
            {
              list.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                  bottomDivider
                  chevron
                />
              ))
            }
          </View>

        </ScrollView>

        <TabNavigatorComponent currentPage={this} selectedTab='user'></TabNavigatorComponent>
      </View>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    height: screen.fullHeight,
    backgroundColor: '#EDEDED',
  },
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