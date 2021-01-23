import { createStackNavigator } from 'react-navigation';

import Create from './create/CreateScreen.container';
import DetailDatXeDX from './detail/DetailScreen.container';
import CalendarCar from './detail/calendarCar/CalendarCar.container';

const DatXeDotXuatStack = createStackNavigator(
  {
    Create,
    DetailDatXeDX,
    CalendarCar,
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
);

export default DatXeDotXuatStack;
