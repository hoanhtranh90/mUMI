import { createBottomTabNavigator } from 'react-navigation';

import tabBarOptions from 'eoffice/utils/tabBarOptions';
import History from './history/HistoryTab';
import Docs from './docs/DocsTab';
import Info from './info/InfoTab';
import Process from './process/ProcessTab';

export default createBottomTabNavigator(
  {
    History,
    Info,
    Docs,
    Process,
  },
  {
    tabBarOptions,
    initialRouteName: 'Info',
    order: ['Info', 'History', 'Process', 'Docs'],
    backBehavior: 'none',
  }
);
