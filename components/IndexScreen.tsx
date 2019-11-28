import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  requireNativeComponent,
  ScrollView
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
import { Tile } from 'react-native-elements'
import TabNavigator from 'react-native-tab-navigator'

_handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

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
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: '首页', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }} />
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
            contentContainerStyle={{ height: 70 }}
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
            contentContainerStyle={{ height: 70 }}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Caption</Text>
              <Text>Caption</Text>
            </View>
          </Tile>
        </ScrollView>
        <TabNavigator>
          <TabNavigator.Item
            // selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image source={require('../assets/icon.png')} />}
            renderSelectedIcon={() => <Image source={require('../assets/icon.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            {/* {homeView} */}
          </TabNavigator.Item>
          <TabNavigator.Item
            // selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image style={{width:40,height:33}} source={require('../assets/icon.png')} />}
            renderSelectedIcon={() => <Image style={{width:40,height:33}} source={require('../assets/icon.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            {/* {homeView} */}
          </TabNavigator.Item>
        </TabNavigator>
      </View >
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
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
});
