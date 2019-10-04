import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  ThemeProvider
} from 'react-native-elements'
import { Player } from 'video-react'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <ThemeProvider>
        <Button title="Hey!" />
        <Player
          playsInline
          poster="/assets/poster.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});