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

import Router from './router/index'

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