import {
  createAppContainer
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';

import ViewScreen from '../components/ViewScreen'
import IndexScreen from '../components/IndexScreen'

const AppNavigator = createStackNavigator({
  View: ViewScreen,
  Index: IndexScreen,
}, {
  initialRouteName: 'Index',
});

export default createAppContainer(AppNavigator);