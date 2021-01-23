import {
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import Sidebar from '../components/Sidebar';
import Documents from '../screens/documents/DocumentStack';
import { AuthLoading, Login, Otp } from '../screens/auth';
import Dashboard from '../screens/dashboard/DashboardStack';
import DashboardOff from '../screens/dashboard/DashboardOfflineStack';
import Tasks from '../screens/tasks/TaskStack';
import Administrative from '../screens/administrative/AdministrativeStack';
import HanhChinhModal from '../screens/administrative/HanhChinhModal';
import BookHotel from '../screens/administrative/bookHotel/BookHotelStack';
import VanPhongPham from '../screens/administrative/vanPhongPham/VanPhongPhamStack';
import RequestSupport from "../screens/administrative/requestSupport/RequestSupportStack";
import VeMayBay from "../screens/administrative/veMayBay/VeMayBayStack";
const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard,
    Documents,
    Tasks,
    Administrative,
    BookHotel,
    VanPhongPham,
    RequestSupport,
    VeMayBay,
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: Sidebar,
  }
);

const AppStack = createStackNavigator(
  {
    HanhChinhModal,
    Main: DrawerNavigator,
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
    headerMode: 'none',
  }
);

export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    AppOff: AppOffStack,
    Auth: Login,
    // Otp: Otp,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
