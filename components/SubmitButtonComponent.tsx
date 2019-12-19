import React from 'react'
import { Button } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import i18n from '../i18n'
import { SubmitButtonComponentStyle as styles } from '../css/default'

export default class SubmitButtonComponent extends React.Component {

  static propProps = {
    type: PropTypes.string.isRequired,
    buttonStyle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'primary',
    buttonStyle: styles.buttonStyle,
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
        style={this.props.buttonStyle}
        onPress={() => this.onPress()}
        disabled={this.state.disabled}
        loading={this.state.disabled}
      >{this.state.title}</Button>
    )
  }
}
