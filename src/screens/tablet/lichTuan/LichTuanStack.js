import { createStackNavigator } from 'react-navigation';
import LichTuanScreen from './LichTuanScreen';
import GhiChuLichTuan from '../ghiChuV2/GhiChuV2Screen';

const LichTuanStack = createStackNavigator(
  {
    LichTuanScreen,
    GhiChuLichTuan
  },
  {
    initialRouteName: 'LichTuanScreen',
    headerMode: 'none',
  }
);

export default LichTuanStack;
