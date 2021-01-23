import { createStackNavigator } from 'react-navigation';

import Details from './details/DetailScreen.tablet';
import List from './list/ListScreen.tablet';
import OutDocDrafts from './outDocDrafts/OutDocDraftsScreen.tablet';

const DocumentStack = createStackNavigator(
  {
    Details,
    List,
    OutDocDrafts,
  },
  {
    initialRouteName: 'OutDocDrafts',
    headerMode: 'none',
  }
);

DocumentStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes[navigation.state.index].routeName === 'Details') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default DocumentStack;
