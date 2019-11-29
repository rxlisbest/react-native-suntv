import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
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

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

const { width, height } = Dimensions.get('window') // 页面宽度和高度

export default class IndexScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: '首页', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }} /> */}
        <ScrollView>
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
            <Button title="Hey!" onPress={() => this.props.navigation.navigate('View')} />
          </ThemeProvider>
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
        <TabNavigatorComponent currentPage={this} selectedTab='index'></TabNavigatorComponent>
      </View >
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    height: height,
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
  }
});
