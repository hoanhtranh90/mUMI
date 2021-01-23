import { createStackNavigator } from 'react-navigation';

import Summary from './list/SummaryScreen.container';
import Search from './search/SearchScreen';
import SelectDeptLT from './list/SelectDeptLT';

const SummaryStack = createStackNavigator(
  {
    Summary,
    Search,
    SelectDeptLT,
  },
  {
    initialRouteName: 'Summary',
    headerMode: 'none',
  }
);

export default SummaryStack;
