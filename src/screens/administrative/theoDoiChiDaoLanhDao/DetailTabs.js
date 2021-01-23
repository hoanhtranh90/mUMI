import { createBottomTabNavigator } from 'react-navigation';

import tabBarOptions from 'eoffice/utils/tabBarOptions';
import DetailScreen from './detailV2/DetailScreen';
import HistoryScreen from "./detailV2/HistoryScreen";
import DocumentsScreen from "./detailV2/DocumentsScreen";
export default createBottomTabNavigator(
  {
    DetailScreen,
    HistoryScreen,
    DocumentsScreen,
  },
  {
    tabBarOptions,
    initialRouteName: 'DetailScreen',
    order: ['DetailScreen','HistoryScreen','DocumentsScreen'],
    backBehavior: 'none',
  }
);
