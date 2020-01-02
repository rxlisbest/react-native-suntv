import React from 'react';
import {
  View
} from 'react-native'
import {
  Video
} from 'expo-av'
import {
  Header
} from 'react-native-elements'
import { channelView } from '../api/Channel'
import { Toast, Portal } from '@ant-design/react-native'
import i18n from '../i18n'
import { ChannelViewScreenStyle as styles } from '../css/default'

// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class ChannelViewScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    loading: false,
    videoSrc: null,
    name: '',
  }

  componentWillMount() {
    // ScreenOrientation.lockAsync (ScreenOrientation.Orientation.LANDSCAPE_LEFT)
    let { id } = this.props.navigation.state.params
    this.channelView(id)
  }

  channelView = (id) => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        let loadingToastKey = Toast.loading(i18n.t('info.loading'))
        channelView(id).then((response) => {
          const videoSrc = response.file.domain + response.file.key
          this.setState({ videoSrc: videoSrc, name: response.name, loading: false })
          Portal.remove(loadingToastKey)
        })
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: 'rgb(240, 161, 168)',
            justifyContent: 'space-around',
          }}
          leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => { this.props.navigation.goBack() } }}
          centerComponent={{ text: this.state.name, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress: () => { this.props.navigation.navigate('Index') } }}
        />
        <Video
          source={{ uri: this.state.videoSrc }}
          ref={this._handleVideoRef}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={styles.backgroundVideo}
          useNativeControls={true}
        />
      </View>
    );
  }
}
