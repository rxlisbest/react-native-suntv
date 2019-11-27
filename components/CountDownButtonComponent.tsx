import React from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Later on in your styles..
var styles = StyleSheet.create({
  codeButton: {
    width: 110,
    height: 40,
  }
})

export default class CountDownButtonComponent extends React.Component {

  static propProps = {
    type: PropTypes.string.isRequired,
    buttonStyle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'outline',
    buttonStyle: styles.codeButton,
    title: '',
    onPress: () => { },
  }

  state = {
    title: this.props.title,
  }

  onPress() {
    this.props.onPress()
  }

  render() {
    return (
      <Button
        type={this.props.type}
        buttonStyle={this.props.buttonStyle}
        title={this.state.title}
        onPress={() => this.onPress()}
      />
    )
  }
}
