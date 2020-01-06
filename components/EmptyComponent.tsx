import React from 'react'
import PropTypes from 'prop-types'
import { EmptyComponentStyle as styles } from '../css/default'
import {
  View,
  Text,
} from 'react-native'

export default class EmptyComponent extends React.Component {

  static propProps = {
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    type: 'outline',
  }

  render() {
    return (
      <View><Text>空的</Text></View>
    )
  }
}
