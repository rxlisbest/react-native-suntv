import React, { Component, PropTypes }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  requireNativeComponent,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import {
  Button,
  ThemeProvider,
  Header
} from 'react-native-elements'

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

export default function App(props) {
  return (
    <Router></Router>
  );
}

// Later on in your styles..
var styles = StyleSheet.create({
  container: {
  },
});