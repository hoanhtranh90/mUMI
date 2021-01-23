import { createStackNavigator } from 'react-navigation';
import ChiDaoScreenTablet from "./tablet/ChiDaoScreenTablet";
const ChiDaoLanhDaoStack = createStackNavigator(
  {
    ChiDaoScreenTablet,
  },
  {
    initialRouteName: 'ChiDaoScreenTablet',
    headerMode: 'none',
  }
);

export default ChiDaoLanhDaoStack;
