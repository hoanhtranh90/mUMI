import { createStackNavigator } from 'react-navigation';
import DashboardScreen from './DashboardScreen';
import DashboardOfflineScreen from './DashboardOfflineScreen';
// import Notifications from './Notifications/NotificationsScreen.container';
import Notifications from './notification';

const DashboardStack = createStackNavigator(
  {
    DashboardScreen,
    DashboardOfflineScreen,
    Notifications,
  },
  { initialRouteName: 'DashboardScreen', headerMode: 'none' }
);

export default DashboardStack;
