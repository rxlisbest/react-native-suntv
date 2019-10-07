import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from "react-redux";
import {
  Button,
  ThemeProvider
} from 'react-native-elements'
import Video from 'react-native-video'
import { Header } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: '首页', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <ThemeProvider>
        <Button title="Hey!" />
      </ThemeProvider>
    </View>
  );
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});