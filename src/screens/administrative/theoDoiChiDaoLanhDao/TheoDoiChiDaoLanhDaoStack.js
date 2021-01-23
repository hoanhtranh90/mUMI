// eslint-disable-next-line import/no-extraneous-dependencies
import { createStackNavigator } from 'react-navigation';

import List from './list/ListScreen';
import Search from './search/SearchScreen';
import DetailTabs from "./DetailTabs";
const TheoDoiChiDaoLanhDaoStack = createStackNavigator(
  {
    List,
    Search,
    DetailTabs
  },
  {
    initialRouteName: 'List',
    headerMode: 'none',
  }
);

export default TheoDoiChiDaoLanhDaoStack;
