import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av'

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class VideoPickerComponent extends React.Component {

  state = {
    videoSrc: null,
    videoPreview: 'none',
  };

  render() {
    let { videoSrc } = this.state;
    let videoPreviewStyle = {
      width: 300,
      height: 200,
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Video
          source={{ uri: videoSrc }}
          ref={this._handleVideoRef}
          // rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={Object.assign(videoPreviewStyle, {display: this.state.videoPreview})}
          fullscreen={false}
          useNativeControls={false}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
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

    // console.log(result)
    if (!result.cancelled) {
      this.setState({ videoSrc: result.uri })
      this.setState({ videoPreview: 'flex' })
      console.log(styles.backgroundVideo)
      // styles.backgroundVideo.display = 'none'
    }
  };
}
var styles = StyleSheet.create({
  backgroundVideo: {
    width: 300,
    height: 200,
  },
});