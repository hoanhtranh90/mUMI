import { createBottomTabNavigator } from 'react-navigation';

import tabBarOptions from 'eoffice/utils/tabBarOptions';
import Docs from './docs/DocsTab';
import History from './history/HistoryTab';
import Info from './info/InfoTab';
import Subtasks from './subtasks/SubtasksTab';

export default createBottomTabNavigator(
  {
    Docs,
    History,
    Info,
    Subtasks,
  },
  {
    tabBarOptions,
    initialRouteName: 'Info',
    order: ['Info', 'History', 'Subtasks', 'Docs'],
    backBehavior: 'none',
  }
);
