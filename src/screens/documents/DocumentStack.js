import { createStackNavigator } from 'react-navigation';

import Details from './details/DetailTabs';
import DetailOutDocs from './details/DetailTabsOutDoc';
import OutDocDrafts from './outDocDrafts/OutDocDraftsScreen';
import Forward from './forward/ForwardScreen';
import List from './list/ListScreen';
import Search from './search/SearchScreen';
import Summary from './summary/SummaryScreen';
import CC from './cc';
import Forwards from './forwards/ForwardsScreen';
import Finishes from './finish/FinishScreen';

const DocumentStack = createStackNavigator(
  {
    CC,
    Details,
    DetailOutDocs,
    Forwards,
    Forward,
    List,
    OutDocDrafts,
    Search,
    Summary,
    Finishes,
  },
  {
    initialRouteName: 'Summary',
    headerMode: 'none',
  }
);

export default DocumentStack;
