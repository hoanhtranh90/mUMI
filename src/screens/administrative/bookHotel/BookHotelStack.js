import { createStackNavigator } from 'react-navigation';

import BookHotelMain from './MainIndex';
import BookHotelCreateEdit from './create-edit/CreateEditScreen';
import BookHotelDetail from './detail/DetailScreen';

const BookHotelStack = createStackNavigator(
  {
    BookHotelMain,
    BookHotelCreateEdit,
    BookHotelDetail
  },
  {
    initialRouteName: 'BookHotelMain',
    headerMode: 'none',
  }
);

export default BookHotelStack;
