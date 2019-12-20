import React from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import {
  Card,
  WhiteSpace,
  Toast,
  Portal,
  List,
} from '@ant-design/react-native'
import { ChannelCategoryScreenStyle as styles } from '../css/default'
import { channelCategoryFamilyIndex } from '../api/ChannelCategory'

export default class ChannelCategoryScreen extends React.Component {

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
        channelCategoryFamilyIndex({ pageNum: this.state.data.pageNum, pageSize: 20 }).then((response) => {
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
          <List>
            {
              this.state.data.list.map((v, k) => (
                <View>
                  <List.Item
                    multipleLine
                    align="middle"
                    arrow="horizontal"
                    onPress={() => { this.props.navigation.navigate('ChannelCategoryUpdate', { id: v.id }) }}
                  >
                    {v.name}
                  </List.Item>
                  <WhiteSpace />
                </View>
              ))
            }
          </List>
        </ScrollView>
      </LayoutComponent>
    );
  }
}

