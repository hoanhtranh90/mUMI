import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import DetailLT from './detail/DetailScreen.container';
import CalendarMeeting from './detail/calendarMeeting/CalendarMeeting.container';
import SelectDept from './common/SelectDept';

const LichTuanStack = createStackNavigator(
  {
    Create,
    DetailLT,
    CalendarMeeting,
    SelectDept,
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
);

export default LichTuanStack;
