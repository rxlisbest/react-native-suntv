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
import ChannelCategoryScreen from '../components/ChannelCategoryScreen'
import ChannelCategoryUpdateScreen from '../components/ChannelCategoryUpdateScreen'
import ChannelUpdateScreen from '../components/ChannelUpdateScreen'
import FamilyScreen from '../components/FamilyScreen'
import FamilyCreateScreen from '../components/FamilyCreateScreen'
import FamilyUpdateScreen from '../components/FamilyUpdateScreen'

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
  ChannelCategory: ChannelCategoryScreen,
  ChannelCategoryUpdate: ChannelCategoryUpdateScreen,
  ChannelUpdate: ChannelUpdateScreen,
  Family: FamilyScreen,
  FamilyCreate: FamilyCreateScreen,
  FamilyUpdate: FamilyUpdateScreen,
}, {
  initialRouteName: 'Init',
});

export default createAppContainer(AppNavigator);