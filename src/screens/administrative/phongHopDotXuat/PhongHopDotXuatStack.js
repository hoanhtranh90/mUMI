import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import DetailDX from './detail/DetailScreen.container';
import CalendarMeeting from './detail/calendarMeeting/CalendarMeeting.container';

const PhongHopDotXuatStack = createStackNavigator(
  {
    Create,
    DetailDX,
    CalendarMeeting,
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
);

export default PhongHopDotXuatStack;
