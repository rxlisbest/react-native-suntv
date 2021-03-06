import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import { Video } from 'expo-av'
import ScreenUtils from '../utils/ScreenUtils'
import { Button, Icon } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import { VideoPickerComponentStyle as styles } from '../css/default'

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class VideoPickerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  static propProps = {
    onChange: PropTypes.func.isRequired,
    videoSrc: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onChange: () => { },
    videoSrc: null,
  }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.videoSrc != this.state.videoSrc) {
  //     this.setState({ videoSrc: nextProps.videoSrc })
  //   }
  // }

  render() {
    let { videoSrc } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={Object.assign({ display: videoSrc !== null ? 'none' : 'flex' }, styles.pickVideo)} onPress={this._pickImage}>
          <Icon name="cloud-upload" style={styles.pickVideoIcon} size={ScreenUtils.width / 2} />
        </TouchableOpacity>
        <View style={{ display: videoSrc !== null ? 'flex' : 'none' }}>
          <Button
            type="ghost"
            onPressIn={this._resetVideo}
            style={styles.closeButton}
          >
            <Icon name="close" color="#999999" />
          </Button>
          <Video
            source={{ uri: videoSrc }}
            ref={this._handleVideoRef}
            // rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            isLooping
            style={Object.assign({ display: videoSrc !== null ? 'flex' : 'none' }, styles.backgroundVideo)}
            fullscreen={false}
            useNativeControls={false}
          >
          </Video>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  _resetVideo = () => {
    this.setState({ videoSrc: null })
    this.props.onChange(null)
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      this.props.onChange(result.uri)
    }
  };
}
