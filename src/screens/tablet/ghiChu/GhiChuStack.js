import { createStackNavigator } from 'react-navigation';
// import GhiChuScreen from "./GhiChuScreen";
import GhiChuScreen from "../ghiChuV2/GhiChuV2Screen";
const GhiChuStack = createStackNavigator(
  {
    GhiChuScreen,
  },
  {
    initialRouteName: 'GhiChuScreen',
    headerMode: 'none',
  }
);

export default GhiChuStack;
