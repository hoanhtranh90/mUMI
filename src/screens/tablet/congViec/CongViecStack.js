import { createStackNavigator } from 'react-navigation';
import CongViecScreen from './CongViecScreen'

const TaskStack = createStackNavigator(
  {
    CongViecScreen,
  },
  {
    initialRouteName: 'CongViecScreen',
    headerMode: 'none',
  }
);

export default TaskStack;
