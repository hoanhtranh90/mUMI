import { createStackNavigator } from 'react-navigation';

import List from './list/ListScreen';
import Search from './search/SearchScreen';
import CommandDetail from './detail/DetailScreen.container';

const ChiDaoLanhDaoStack = createStackNavigator(
  {
    List,
    Search,
    CommandDetail,
  },
  {
    initialRouteName: 'List',
    headerMode: 'none',
  }
);

export default ChiDaoLanhDaoStack;
