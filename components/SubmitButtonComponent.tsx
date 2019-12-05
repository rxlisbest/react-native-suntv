import React from 'react'
import { Button } from '@ant-design/react-native'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import i18n from '../i18n'

// Later on in your styles..
var styles = StyleSheet.create({
  codeButton: {
    width: 110,
    height: 40,
  }
})

export default class SubmitButtonComponent extends React.Component {

  static propProps = {
    type: PropTypes.string.isRequired,
    buttonStyle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'primary',
    buttonStyle: styles.codeButton,
    title: '',
    onPress: () => { },
  }

  state = {
    title: this.props.children,
    disabled: false
  }

  async onPress() {
    this.setState({ 'disabled': true })
    this.setState({ 'title': i18n.t('button.loading') })
    let result = await this.props.onPress()
    this.setState({ 'disabled': false })
    this.setState({ 'title': this.props.children })
  }

  render() {
    return (
      <Button
        type={this.props.type}
        buttonStyle={this.props.buttonStyle}
        onPress={() => this.onPress()}
        disabled={this.state.disabled}
        loading={this.state.disabled}
      >{this.state.title}</Button>
    )
  }
}
