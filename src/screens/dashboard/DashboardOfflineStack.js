import { createStackNavigator } from 'react-navigation';
import DashboardOfflineScreen from './DashboardOfflineScreen';

const DashboardOfflineStack = createStackNavigator(
  {
    DashboardOfflineScreen,
  },
  { initialRouteName: 'DashboardOfflineScreen', headerMode: 'none' }
);

export default DashboardOfflineStack;
