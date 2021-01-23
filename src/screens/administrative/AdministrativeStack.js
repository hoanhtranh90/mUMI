// eslint-disable-next-line import/no-extraneous-dependencies
import { createStackNavigator } from 'react-navigation';

import AdministrativeSummary from './summary/SummaryStack';
import PhongHop from './phongHop/PhongHopStack';
import PhongHopDotXuat from './phongHopDotXuat/PhongHopDotXuatStack';
import DatXe from './datXe/DatXeStack';
import DatXeDotXuat from './datXeDotXuat/DatXeDotXuatStack';
import TheoDoiChiDaoLanhDao from './theoDoiChiDaoLanhDao/TheoDoiChiDaoLanhDaoStack';
import LichTuan from './lichTuan/LichTuanStack';
const AdministrativeStack = createStackNavigator(
  {
    AdministrativeSummary,
    PhongHop,
    PhongHopDotXuat,
    DatXe,
    DatXeDotXuat,
    TheoDoiChiDaoLanhDao,
    LichTuan,
  },
  {
    initialRouteName: 'AdministrativeSummary',
    headerMode: 'none',
  }
);

export default AdministrativeStack;
