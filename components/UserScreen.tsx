import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  ListItem,
  Icon
} from 'react-native-elements'
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import { Flex, Button, WhiteSpace } from '@ant-design/react-native'
import ScreenUtils from '../utils/ScreenUtils'
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
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <View style={styles.avatarContainer}>
          <Flex justify="center" align="center">
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Avatar
                rounded
                size="large"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Flex direction="column" justify="start" align="start">
                <Flex.Item style={styles.nameFlexItem}>
                  <Text style={styles.nameFlexItemText}>这是姓名</Text>
                </Flex.Item>
                <Flex.Item>
                  <Button size="small" type="ghost" style={styles.changeFamilyButton} >
                    <Text style={styles.changeFamilyButtonText}>{i18n.t('user.changeFamily')}</Text>
                  </Button>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            </Flex.Item>
          </Flex>
        </View>
        <WhiteSpace />
        <ScrollView>
          <Flex justify="center" align="center" style={styles.createFlex}>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChannelCreate')}>
                <Flex direction="column">
                  <Flex.Item style={styles.createFlexItem}>
                    <Icon name="videocam" size={ScreenUtils.width / 9} />
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.createFlexText}>{i18n.t('user.createChannel')}</Text>
                  </Flex.Item>
                </Flex>
              </TouchableOpacity>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChannelCategoryCreate')}>
                <Flex direction="column">
                  <Flex.Item style={styles.createFlexItem}>
                    <Icon name="apps" size={ScreenUtils.width / 9} />
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.createFlexText}>{i18n.t('user.createCategory')}</Text>
                  </Flex.Item>
                </Flex>
              </TouchableOpacity>
            </Flex.Item>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChannelCreate')}>
                <Flex direction="column">
                  <Flex.Item style={styles.createFlexItem}>
                    <Icon name="people" size={ScreenUtils.width / 9} />
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.createFlexText}>{i18n.t('user.createFamily')}</Text>
                  </Flex.Item>
                </Flex>
              </TouchableOpacity>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
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
  },
  list: {
    // marginTop: 10,
  },
  createFlex: {
    height: ScreenUtils.width / 3,
    backgroundColor: '#FFFFFF',
    color: '#999999',
  },
  createFlexText: {
    // color: '#999999',
  },
  createFlexItem: {
    marginBottom: ScreenUtils.width / 18,
  },
  changeFamilyButton: {
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderRadius: 10,
  },
  changeFamilyButtonText: {
    color: '#FFFFFF',
  },
  nameFlexItem: {
    marginBottom: 25,
  },
  nameFlexItemText: {
    fontSize: 15,
  },
});