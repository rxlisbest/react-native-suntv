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
}, {
  initialRouteName: 'Init',
});

export default createAppContainer(AppNavigator);