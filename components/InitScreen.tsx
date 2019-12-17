import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Platform,
  BackHandler,
} from 'react-native'
import { connect } from 'react-redux'
import { change } from '../store/actionCreators'

class InitScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    subscription: undefined,
  }

  componentDidMount() {
    if(Platform.OS === "android") {
      BackHandler.addEventListener('hardwareBackPress', ()=>{
        this.setToken()
      })
    }
    this.setToken()
  }

  async setToken() {
    let token = await AsyncStorage.getItem('token')
    if (token != null) {
      this.props.changeData(token)
      setTimeout(() => {
        this.props.navigation.navigate('Index')
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
