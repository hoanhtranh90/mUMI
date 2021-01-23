import { useReducer } from 'react';
import { Alert, Platform } from 'react-native';
import axios from '../../store/axios';
import { getMenuConfig } from '../../store/auth/service';
import { MENU_LIST, POSITION_NAME } from '../../constants/documents';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../utils/NavigationService';
import store from '../../store';
import DeviceInfo from 'react-native-device-info';

const loadData = () =>
  axios.get('/dashboard').then(res => {
    return res.data.filter(
      userDeptRole =>
        userDeptRole && userDeptRole.userDeptRole.positionName !== POSITION_NAME.VAN_THU
    );
  });
export const loadUnseenNoti = () => {
  const params = {
    os: Platform.OS,
    modelCode: DeviceInfo.getDeviceId(),
  };
  return axios.get(`vbNotification/countUnSeen`, { params: params }).then(res => {
    return res.data;
  });
};
const initialState = {
  loading: true,
  data: [
    {
      countOfIncomingDoc: 0,
      countOfOutGoingDoc: 0,
      countOfUnreadBanHanhOutGoingDoc: 0,
      countOfUnreadIncomingDoc: 0,
      countOfUnreadOutGoingDoc: 0,
      deptName: null,
      roleName: null,
      userDeptRole: {
        id: '',
        positionName: '',
      },
    },
  ],
  currentDeptRoleId: null,
  countUnseenNoti: 0,
  menuConfig: [],
  menuConfigLoading: false,
};

function checkExist(data, item) {
  if (data.length > 0) {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]?.menuCode === item) {
        return true;
      }
    }
  }
  return false;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case 'countUnseenNoti':
      return {
        ...state,
        countUnseenNoti: action.payload.countUnseenNoti,
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'setLoadingMenuConfig':
      return {
        ...state,
        menuConfigLoading: action.payload,
      };
    case 'setCurrentDeptRoleId':
      return {
        ...state,
        currentDeptRoleId: action.payload.currentDeptRoleId,
      };
    case 'getMenuConfig': {
      const hasVDDen = checkExist(action.payload.menuConfig.data, MENU_LIST.VB_DEN);
      const hasVDDuThao = checkExist(action.payload.menuConfig.data, MENU_LIST.VB_DI_DUTHAO);
      const hasVDDaPhatHanh = checkExist(
        action.payload.menuConfig.data,
        MENU_LIST.VB_DI_DAPHATHANH
      );
      const congViec = checkExist(action.payload.menuConfig.data, MENU_LIST.CONGVIEC);
      const hanhChinh = checkExist(action.payload.menuConfig.data, MENU_LIST.HANHCHINH);
      const newState = state;
      newState.data[action.payload.index].countOfIncomingDoc = hasVDDen
        ? newState.data[action.payload.index].countOfIncomingDoc
        : null;
      newState.data[action.payload.index].countOfOutGoingDoc = hasVDDuThao
        ? newState.data[action.payload.index].countOfOutGoingDoc
        : null;
      newState.data[action.payload.index].countOfUnreadBanHanhOutGoingDoc = hasVDDaPhatHanh
        ? newState.data[action.payload.index].countOfUnreadBanHanhOutGoingDoc
        : null;
      newState.data[action.payload.index].countOfUnreadIncomingDoc = congViec
        ? newState.data[action.payload.index].countOfUnreadIncomingDoc
        : null;
      newState.data[action.payload.index].countOfUnreadOutGoingDoc = hanhChinh
        ? newState.data[action.payload.index].countOfUnreadOutGoingDoc
        : null;
      return { ...newState, menuConfig: action.payload.menuConfig.data, menuConfigLoading: false };
    }
    default:
      return state;
  }
};

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    async init() {
      try {
        dispatch({ type: 'setLoading', payload: true });
        const listUserDept = store.getState().auth.me.deptRoles;
        const res = await loadData();
        let data = res.filter(item => {
          let userDeptRoleId = item.userDeptRole.id;
          let index = listUserDept.findIndex(userDept => userDept.id === userDeptRoleId);
          return index > -1;
        });
        dispatch({ type: 'loaded', payload: { data } });
      } catch (e) {
        if (e.toString().includes('code 401')) {
          Alert.alert('Thông báo', 'Hết phiên làm việc, vui lòng đăng nhập lại!', [
            { text: 'Đóng', style: 'destructive' },
          ]);
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('otpToken');
          NavigationService.navigate('Auth');
        } else {
          Alert.alert('Thông báo', 'Lấy thông tin tổng hợp thất bại', [
            { text: 'Đóng', style: 'destructive' },
          ]);
        }
      }
    },
    async getUnseenNoti(currentDeptRoleId) {
      try {
        if (currentDeptRoleId !== state.currentDeptRoleId && currentDeptRoleId !== undefined) {
          dispatch({
            type: 'setCurrentDeptRoleId',
            payload: {
              currentDeptRoleId,
            },
          });
          const countUnseenNoti = await loadUnseenNoti();
          dispatch({ type: 'countUnseenNoti', payload: { countUnseenNoti } });
        } else if (currentDeptRoleId === null) {
          const countUnseenNoti = await loadUnseenNoti();
          dispatch({ type: 'countUnseenNoti', payload: { countUnseenNoti } });
        }
      } catch (error) {
        if (error.toString().includes('code 401')) {
          // Hết phiên làm việc, vui lòng đăng nhập lại!
          Alert.alert('Thông báo', 'Hết phiên làm việc, vui lòng đăng nhập lại!', [
            { text: 'Đóng', style: 'destructive' },
          ]);
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('otpToken');
          NavigationService.navigate('Auth');
        } else {
          Alert.alert('Thông báo', 'Lấy thông báo theo chức vụ thất bại', [
            { text: 'Đóng', style: 'destructive' },
          ]);
        }
      }
    },
    async getMenuConfig(index) {
      try {
        const menuConfig = await getMenuConfig();
        if (menuConfig.data.length > 0 && menuConfig.data.length < 1000) {
          dispatch({ type: 'getMenuConfig', payload: { index, menuConfig } });
        }
      } catch (error) {
        // Alert.alert('Thông báo', 'Lấy thông báo theo chức vụ thất bại', [
        //   { text: 'Đóng', style: 'destructive' },
        // ]);
      }
    },
  };

  return [state, actions];
}
