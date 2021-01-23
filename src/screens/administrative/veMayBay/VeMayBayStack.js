import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import DetailVeMayBay from './detail/DetailScreen.container';
import CalendarCar from './detail/calendarCar/CalendarCar.container';
import ListScreenMayBay  from "./list/ListScreenContainer";
const VeMayBayStack = createStackNavigator(
  {
    ListScreenMayBay,
    Create,
    DetailVeMayBay,
    CalendarCar,
  },
  {
    initialRouteName: 'ListScreenMayBay',
    headerMode: 'none',
  }
);

export default VeMayBayStack;
