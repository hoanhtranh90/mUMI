import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import Detail from './detail/DetailScreen.container';
import CalendarMeeting from './detail/calendarMeeting/CalendarMeeting.container';

const PhongHopStack = createStackNavigator(
  {
    Create,
    Detail,
    CalendarMeeting,
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
);

export default PhongHopStack;
