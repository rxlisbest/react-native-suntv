import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  requireNativeComponent
} from 'react-native';
import {
  connect
} from "react-redux";
import {
  Button,
  ThemeProvider
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

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class IndexScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  componentDitMount(){
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: '首页', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}/>
        <Text>Index!</Text>
        <Video
          source={{ uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
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
          <Button title="Hey!" onPress={() => this.props.navigation.navigate('View')}  />
        </ThemeProvider>
      </View>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: 300,
    height: 200,
  },
});