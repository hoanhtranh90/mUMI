import { createStackNavigator } from 'react-navigation';
import MayBayScreenTablet from "./tablet/MayBayScreenTablet";
import DetailScreen from "./detail/DetailScreen.container";
const VeMayBayStack = createStackNavigator(
  {
    MayBayScreenTablet,
    DetailScreen,
  },
  {
    initialRouteName: 'MayBayScreenTablet',
    headerMode: 'none',
  }
);

export default VeMayBayStack;
