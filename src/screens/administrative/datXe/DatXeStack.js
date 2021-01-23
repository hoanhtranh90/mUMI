import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import DetailDatXe from './detail/DetailScreen.container';
import CalendarCar from './detail/calendarCar/CalendarCar.container';

const DatXeStack = createStackNavigator(
  {
    Create,
    DetailDatXe,
    CalendarCar,
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
);

export default DatXeStack;
