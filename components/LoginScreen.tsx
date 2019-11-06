import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  requireNativeComponent,
  ImageBackground,
  Dimensions
} from 'react-native';
import {
  connect
} from "react-redux";
import {
  Button,
  ThemeProvider,
  Header,
  Image,
  Input
} from 'react-native-elements'
import {
  Audio,
  Video
} from 'expo-av';
import {
  ScreenOrientation
} from 'expo'
const { width, height } = Dimensions.get('window')

// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

const _handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}

export default class ViewScreen extends React.Component {
  state = {
    placeholder: "测试输入框"
  }

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={require('../assets/php.jpg')} style={styles.containerBackground}
          // resizeMode="stretch"
        >
          <Text>Open up App.tsx to start working on your app!</Text>
          <Input
            placeholder={this.state.placeholder}
            errorStyle={{ color: 'red' }}
            errorMessage='ENTER A VALID ERROR HERE'
          />
          <Image
            resizeMode="stretch"
            source={{ uri: 'http://localhost:8080/captcha.jpg' }}
            style={styles.captcha}
          />
          <Input
            placeholder={this.state.placeholder}
            errorStyle={{ color: 'red' }}
            errorMessage='ENTER A VALID ERROR HERE'
          />
          <ThemeProvider>
            <Button title="Hey!" onPress={() => this.props.navigation.navigate('Index')} />
          </ThemeProvider>
        </ImageBackground>
      </View>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    flex: 1,
    //宽高为 null 屏幕自适应
    width: null,
    height: null
  },
  captcha: {
    width: 200,
    height: 34
  }
});