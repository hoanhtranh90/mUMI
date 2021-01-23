/* eslint-disable global-require,import/no-unresolved */
import colors from 'eoffice/utils/colors';
import { DOCUMENT_TYPE, MENU_LIST } from '../../constants/documents';

export const getItems = ({ setDocumentMode, logout, navigation, getMenuConfig,routeToLichTuan, roleId }) => [
  {
    id: 0,
    label: 'Văn bản đến',
    img: require('eoffice/assets/docIn.png'),
    labelColor: colors.blue,
    route: 'Documents',
    code : MENU_LIST.VB_DEN,
    focused: false,
    onPress: () => {
      setDocumentMode(DOCUMENT_TYPE.VB_DEN);
      navigation.navigate('Documents');
      navigation.navigate('Summary');
    },
  },
  {
    id: 1,
    label: 'Văn bản đi',
    img: require('eoffice/assets/docOut.png'),
    labelColor: colors.blue,
    route: 'Documents',
    code : MENU_LIST.VB_DI_DUTHAO,
    focused: false,
    onPress: () => {
      setDocumentMode(DOCUMENT_TYPE.VB_DI);
      navigation.navigate('Documents');
      navigation.navigate('Summary');
    },
  },
  {
    id: 2,
    label: 'Công việc',
    img: require('eoffice/assets/work.png'),
    labelColor: colors.yellow,
    route: 'Tasks',
    focused: false,
    code : MENU_LIST.CONGVIEC,
    onPress: () => {
      navigation.navigate('Tasks');
      navigation.navigate('List');
    },
  },
  {
    id: 7,
    label: 'Lịch tuần',
    img: require('eoffice/assets/calendar.png'),
    labelColor: colors.brown,
    route: 'AdministrativeSummary',
    code : MENU_LIST.HANHCHINH_LICHTUAN,
    // route: 'Administrative',
    focused: false,
    onPress: () => {
      routeToLichTuan();
    },
  },
  // {
  //   id: 4,
  //   label: 'Truyền thông',
  //   img: require('eoffice/assets/media.png'),
  //   labelColor: '#e62565',
  //   route: '',
  //   focused: false,
  //   onPress: () => {},
  // },
  // {
  //   id: 5,
  //   label: 'Cài đặt',
  //   img: require('eoffice/assets/setting.png'),
  //   labelColor: colors.gray,
  //   route: '',
  //   focused: false,
  //   onPress: () => {},
  // },

  {
    id: 6,
    label: 'Đăng xuất',
    img: require('eoffice/assets/logout.png'),
    labelColor: colors.gray,
    route: 'Auth',
    focused: false,
    onPress: () => {
      global.hasDeeplink = null;
      logout();
    },
  },
];
