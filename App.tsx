import React from 'react';
import {
  StyleSheet,
} from 'react-native'

import Router from './router/index'
import * as Permissions from 'expo-permissions'
async function getLocationAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  } else {
    throw new Error('Location permission not granted');
  }
}
import { AppLoading } from 'expo'
import { Font } from 'expo-font'
import store from './store'
import { Provider } from 'react-redux'

import { Provider as AntProvider } from '@ant-design/react-native'

export default class App extends React.Component {
  state = {
    theme: null,
    currentTheme: null,
    isReady: false,
  };
  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  };
  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }
  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <AntProvider>
          <Router></Router>
        </AntProvider>
      </Provider>
    );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  container: {
  },
});