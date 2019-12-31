import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {
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
import { Card, WhiteSpace, Toast, Portal, Button } from '@ant-design/react-native'
import { ChannelScreenStyle as styles } from '../css/default'
import { channelFamilyIndex } from '../api/Channel'

export default class ChannelScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    isRefreshing: false,
    loading: false,
    data: {
      pages: 1,
      pageNum: 0,
      list: [],
    },
  }

  componentWillMount() {
    this.initList()
  }

  initList = () => {
    this.setState({
      data: {
        ...this.state.data,
        pages: 1,
        pageNum: 0,
        list: [],
      }
    }, () => {
      this.getList(false)
    })
  }

  getList = (loadingToast = true) => {
    if (!this.state.loading) {
      if (this.state.data.pageNum == this.state.data.pages) {
        Toast.info(i18n.t('info.noMore'), 0.5)
        return false
      }
      this.setState({
        loading: true,
        data: {
          ...this.state.data, pageNum: this.state.data.pageNum + 1
        }
      }, () => {
        let loadingToastKey
        if (loadingToast) {
          loadingToastKey = Toast.loading(i18n.t('info.loading'))
        }
        channelFamilyIndex({ pageNum: this.state.data.pageNum, pageSize: 20 }).then((response) => {
          if (this.state.data.pageNum == response.pageNum) {
            this.setState({ data: { ...response, list: this.state.data.list.concat(response.list) }, loading: false })
          } else {
            this.setState({ loading: false })
          }
          if (loadingToast) {
            Portal.remove(loadingToastKey)
          } else {
            this.setState({ isRefreshing: false })
          }
        })
      })
    }
  }

  _contentViewScroll = (e: Object) => {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    // if (offsetY == 0) {
    //   this.initChannel()
    // }
    if (parseInt(offsetY + oriageScrollHeight) >= parseInt(contentSizeHeight)) {
      this.getList()
    }
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView
          style={styles.scrollViewStyle}
          onMomentumScrollEnd={this._contentViewScroll}
          onMomentumScrollBegin={this._contentViewScroll}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          scrollsToTop={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.initList}
              tintColor="#FFFFFF"
              title={i18n.t('info.loading')}
              titleColor="#FFFFFF"
              colors={['#FFFFFF']}
              progressBackgroundColor="rgb(240, 161, 168)"
            />
          }
        >
          {
            this.state.data.list.map((v, k) => (
              <View>
                <Card full>
                  <Card.Header
                    title={v.name}
                    thumbStyle={{ width: 30, height: 30 }}
                    // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={v.channel_category.name}
                  />
                  <Card.Body style={styles.cardBodyStyle}>
                    <View style={styles.cardBodyImageStyle}>
                      <Image
                        source={{ uri: v.file.domain + v.file.key + '?vframe/jpg/offset/0' }}
                        style={styles.cardBodyImageStyle}
                      />
                    </View>
                  </Card.Body>
                  <Card.Footer
                    content={
                      <Button
                        type="warning"
                        size="small"
                        style={styles.cardFooterDeleteButtonStyle}
                        onPress={() => {}}
                      >
                        {i18n.t('button.delete')}
                      </Button>
                    }
                    extra={
                      <Button
                        type="primary"
                        size="small"
                        style={styles.cardFooterEditButtonStyle}
                        onPress={() => this.props.navigation.navigate('ChannelUpdate', {id: v.id})}
                      >
                        {i18n.t('button.edit')}
                      </Button>
                    }
                  />
                </Card>
                <WhiteSpace />
              </View>
            ))
          }
        </ScrollView>
      </LayoutComponent>
    );
  }
}

