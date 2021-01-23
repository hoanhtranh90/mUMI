import { createStackNavigator } from 'react-navigation';

import RequestSupportMain from './MainIndex';
import RequestSupportCreateEdit from './create-edit/CreateEditScreen';
import RequestSupportDetail from './detail/DetailScreen';

const RequestSupportStack = createStackNavigator(
  {
    RequestSupportMain,
    RequestSupportCreateEdit,
    RequestSupportDetail
  },
  {
    initialRouteName: 'RequestSupportMain',
    headerMode: 'none',
  }
);

export default RequestSupportStack;
