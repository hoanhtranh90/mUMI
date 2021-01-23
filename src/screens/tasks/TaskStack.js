import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen';
import Details from './details/DetailTabs';
import List from './list/ListScreen';
import Search from './search/SearchScreen';

const TaskStack = createStackNavigator(
  {
    Create,
    Details,
    List,
    Search,
  },
  {
    initialRouteName: 'List',
    headerMode: 'none',
  }
);

export default TaskStack;
