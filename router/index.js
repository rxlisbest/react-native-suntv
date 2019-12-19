import {
  createAppContainer
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';

import ViewScreen from '../components/ViewScreen'
import IndexScreen from '../components/IndexScreen'
import LoginScreen from '../components/LoginScreen'
import UserScreen from '../components/UserScreen'
import ChannelCreateScreen from '../components/ChannelCreateScreen'
import ChannelCategoryCreateScreen from '../components/ChannelCategoryCreateScreen'
import RegisterScreen from '../components/RegisterScreen'
import PasswordLoginScreen from '../components/PasswordLoginScreen'
import InitScreen from '../components/InitScreen'
import ChannelViewScreen from '../components/ChannelViewScreen'
import ChannelScreen from '../components/ChannelScreen'

const AppNavigator = createStackNavigator({
  View: ViewScreen,
  Index: IndexScreen,
  Login: LoginScreen,
  User: UserScreen,
  ChannelCreate: ChannelCreateScreen,
  ChannelCategoryCreate: ChannelCategoryCreateScreen,
  Register: RegisterScreen,
  PasswordLogin: PasswordLoginScreen,
  Init: InitScreen,
  ChannelView: ChannelViewScreen,
  Channel: ChannelScreen,
}, {
  initialRouteName: 'Init',
});

export default createAppContainer(AppNavigator);