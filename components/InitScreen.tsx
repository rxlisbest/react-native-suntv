import React from 'react'
import {
  Text,
  View,
  AsyncStorage,
  Platform,
  BackHandler,
} from 'react-native'
import { connect } from 'react-redux'
import { change } from '../store/actionCreators'
import { InitScreenStyle as styles } from '../css/default'

class InitScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    subScription: undefined,
  }

  componentWillMount = () => {
    // if (Platform.OS === "android") {
    //   BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
    // }
    this.setToken()
  }

  componentWillUnmount = () => {
    // BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress)
  }

  hardwareBackPress = () => {
    if (this.props.navigation.state.routeName == 'Init') {
      this.setToken()
    }
  }

  setToken = async () => {
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
