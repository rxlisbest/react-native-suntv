import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { change } from '../store/actionCreators'

class InitScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
    this.setToken()
  }

  async setToken() {
    let token = await AsyncStorage.getItem('token')
    if (token != null) {
      this.props.changeData(token)
      setTimeout(() => {
        this.props.navigation.navigate('ChannelCreate')
      }, 1000)
    } else {
      this.props.navigation.navigate('PasswordLogin')
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>启动页</Text>
      </View >
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
  },
})

const mapState = state => ({
  token: state.token
})

const mapDispatch = dispatch => ({
  changeData(token) {
    dispatch(change(token))
  }
})

export default connect(
  mapState,
  mapDispatch
)(InitScreen)
