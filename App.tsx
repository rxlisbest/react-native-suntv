import React, { Component, PropTypes }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  requireNativeComponent
} from 'react-native';
import { connect } from "react-redux";
import {
  Button,
  ThemeProvider,
  Header
} from 'react-native-elements'
import ViewScreen from './components/view'
import IndexScreen from './components/IndexScreen'


export default function App(props) {
  return (
    <ViewScreen></ViewScreen>
  );
}

// Later on in your styles..
var styles = StyleSheet.create({
  container: {
  },
});