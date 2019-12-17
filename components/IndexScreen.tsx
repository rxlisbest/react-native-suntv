import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Tile } from 'react-native-elements'
import i18n from '../i18n'
import ScreenUtils from '../utils/ScreenUtils'
import LayoutComponent from './LayoutComponent'
import { WhiteSpace, Toast, Portal } from '@ant-design/react-native'
import { channelIndex } from '../api/Channel'

export default class IndexScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    isRefreshing: false,
    loading: false,
    channelData: {
      pages: 1,
      pageNum: 0,
      list: [],
    },
  }

  componentWillMount() {
    this.initChannel()
    // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  }

  initChannel = () => {
    this.setState({
      channelData: {
        ...this.state.channelData,
        pages: 1,
        pageNum: 0,
        list: [],
      }
    }, () => {
      this.getChannel(false)
    })
  }

  getChannel = (loadingToast = true) => {
    if (!this.state.loading) {
      if (this.state.channelData.pageNum == this.state.channelData.pages) {
        Toast.info(i18n.t('info.noMore'), 0.5)
        return false
      }
      this.setState({
        loading: true,
        channelData: {
          ...this.state.channelData, pageNum: this.state.channelData.pageNum + 1
        }
      }, () => {
        let loadingToastKey
        if (loadingToast) {
          loadingToastKey = Toast.loading(i18n.t('info.loading'))
        }
        channelIndex({ pageNum: this.state.channelData.pageNum }).then((response) => {
          if (this.state.channelData.pageNum == response.pageNum) {
            let channelDataList = this.state.channelData.list
            let responseList = response.list
            responseList = channelDataList.concat(responseList)
            response.list = responseList
            this.setState({ channelData: response, loading: false })
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
      this.getChannel()
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
              onRefresh={this.initChannel}
              tintColor="#FFFFFF"
              title={i18n.t('info.loading')}
              titleColor="#FFFFFF"
              colors={['#FFFFFF']}
              progressBackgroundColor="rgb(240, 161, 168)"
            />
          }
        >
          {
            this.state.channelData.list.map((v, k) => (
              <View>
                <Tile
                  containerStyle={styles.tileContainerStyle}
                  imageSrc={{ uri: v.file.domain + v.file.key + '?vframe/jpg/offset/0' }}
                  imageContainerStyle={styles.tileImageContainerStyle}
                  imageProps={{ resizeMode: 'cover' }}
                  title={v.name}
                  titleStyle={{ flexWrap: 'nowrap' }}
                  icon={{ name: 'play-circle', type: 'font-awesome' }} // optional
                  contentContainerStyle={{ height: 70, flexWrap: 'nowrap' }}
                  onPress={() => { this.props.navigation.navigate('ChannelView', { id: v.id }) }}
                >
                </Tile>
                <WhiteSpace />
              </View>
            ))
          }
        </ScrollView>
      </LayoutComponent>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    height: ScreenUtils.fullHeight,
  },
  backgroundVideo: {
    flex: 1,
    width: 300,
    height: 200,
  },
  scrollViewStyle: {
    flex: 1,
  },
  tileContainerStyle: {
    backgroundColor: '#FFFFFF',
  },
  tileImageContainerStyle: {
    backgroundColor: '#000000',
    width: ScreenUtils.width,
    height: ScreenUtils.width / 16 * 9,
  },
});
