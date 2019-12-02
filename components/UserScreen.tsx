import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  ListItem
} from 'react-native-elements'
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
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

export default class UserScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  render() {
    return (
      <LayoutComponent currentPage={this} selectedTab='user'>
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