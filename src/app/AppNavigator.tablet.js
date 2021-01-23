import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import React from 'react';

import BottomBar from '../components/BottomBar';
import HanhChinhModal from '../screens/administrative/HanhChinhModal';
import { AuthLoading, LoginTablet, OtpTablet } from '../screens/auth';
import Dashboard from '../screens/dashboard/DashboardScreen.tablet';
import DashboardOff from '../screens/dashboard/DashboardScreenOffline.tablet';
import Documents from '../screens/documents/DocumentStack.tablet';
import Tasks from '../screens/tablet/congViec/CongViecStack';
import LichTuan from '../screens/tablet/lichTuan/LichTuanStack';
import GhiChuStack from "../screens/tablet/ghiChu/GhiChuStack";
import ChiDaoLanhDaoStack from "../screens/administrative/theoDoiChiDaoLanhDao/ChiDaoLanhDaoStack.tablet";
import VeMayBayStack from "../screens/administrative/veMayBay/VeMayBayStack.tablet";

const MainNavigator = createBottomTabNavigator(
  {
    Dashboard,
    Documents,
    Tasks,
    LichTuan,
    GhiChuStack,
    ChiDaoLanhDaoStack,
    VeMayBayStack
  },
  {
    initialRouteName: 'Dashboard',
    tabBarComponent: props => <BottomBar {...props} />,
  }
);


const AppStack = createStackNavigator(
  {
    HanhChinhModal,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 0.99,
    },
  }
);
const AppOffStack = createStackNavigator(
  {
    DashboardOff,
  },
  {
    initialRouteName: 'DashboardOff',
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 0.99,
    },
  }
);
export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    AppOff: AppOffStack,
    Auth: LoginTablet,
    Otp: OtpTablet,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
