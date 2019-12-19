import React from 'react'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { CaptchaInputComponentStyle as styles } from '../css/default'

export default class CaptchaInputComponent extends React.Component {

  static propProps = {
    type: PropTypes.string.isRequired,
    buttonStyle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    second: PropTypes.number.isRequired
  }

  static defaultProps = {
    type: 'outline',
    buttonStyle: styles.codeButton,
    title: '',
    onPress: () => { },
    second: 10,
  }

  state = {
    title: this.props.title,
    disabled: false
  }

  onPress() {
    let result = this.props.onPress()
    if (result !== false) {
      this.setState({ 'disabled': true })
      let second = this.props.second
      let countDown = setInterval(() => {
        second -= 1
        if (second < 0) {
          clearInterval(countDown)
          this.setState({ 'disabled': false })
          this.setState({ 'title': this.props.title })
        } else {
          this.setState({ 'title': second })
        }
      }, 1000)
    }
  }

  render() {
    return (
      <Button
        type={this.props.type}
        buttonStyle={this.props.buttonStyle}
        title={this.state.title}
        onPress={() => this.onPress()}
        disabled={this.state.disabled}
      />
    )
  }
}
