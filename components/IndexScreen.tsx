import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
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
import { WhiteSpace, Toast, Portal } from '@ant-design/react-native'
import { channelIndex } from '../api/Channel'

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

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

  getChannel = (loading = true) => {
    if (!this.state.loading) {
      if (this.state.channelData.pageNum == this.state.channelData.pages) {
        Toast.info(i18n.t('info.noMore'), 1)
        return false
      }
      this.setState({
        loading: true,
        channelData: {
          ...this.state.channelData, pageNum: this.state.channelData.pageNum + 1
        }
      }, () => {
        if (loading) {
          const key = Toast.loading(i18n.t('info.loading'))
        }
        console.log(this.state.channelData.pageNum)
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
          if (loading) {
            Portal.remove(key)
          } else {
            this.setState({isRefreshing: false})
          }
        })
      })
    }
  }

  _contentViewScroll = (e: Object) => {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY == 0) {
      this.initChannel()
    }
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
              tintColor="#ff0000"
              title={i18n.t('info.loading')}
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="rgb(240, 161, 168)"
            />
          }
        >
          <Video
            source={{ uri: 'http://suntv.cdn.ruixinglong.net/eec2afc1-d357-43a1-a919-d9672d79b774.m3u8' }}
            ref={this._handleVideoRef}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}
            fullscreen={true}
            useNativeControls={true}
          />
          <ThemeProvider>
            <Button title="Hey!" onPress={() => this.props.navigation.navigate('View')} />
          </ThemeProvider>
          {
            this.state.channelData.list.map((v, k) => (
              <View>
                <Tile
                  containerStyle={{ backgroundColor: '#FFFFFF' }}
                  imageSrc={{ uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3941897846,2741978728&fm=26&gp=0.jpg' }}
                  title={v.name}
                  icon={{ name: 'play-circle', type: 'font-awesome' }} // optional
                  contentContainerStyle={{ height: 80 }}
                >
                </Tile>
                <WhiteSpace />
              </View>
            ))
          }
          <Tile
            imageSrc={{ uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3941897846,2741978728&fm=26&gp=0.jpg' }}
            title="Lorem ipsum"
            icon={{ name: 'play-circle', type: 'font-awesome' }} // optional
            contentContainerStyle={{ height: 100 }}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Caption</Text>
              <Text>Caption</Text>
            </View>
          </Tile>
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: 300,
    height: 200,
  },
  scrollViewStyle: { 
    flex: 1,
  }
});
