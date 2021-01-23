import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions as documentActions } from 'eoffice/store/documents/notification';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import { actions as summaryActions } from 'eoffice/store/administrative/summary';
import { actions as detailDatXeActions } from 'eoffice/store/administrative/datXe/detail';
import { actions as detailActions } from 'eoffice/store/administrative/phongHop/detail';
import { actions as detailLTActions } from 'eoffice/store/administrative/lichTuan/detail';
import { FLOW_INFO, DEEP_LINK } from 'eoffice/constants/administrative';
import axios, { setHeaders } from '../axios';
import createOperation from '../createOperation';
import * as authService from './service';
import slice from './slice';
import items from '../../screens/administrative/HanhChinhModal/items';
import store from '../index';
import { actions as actionsDocumentsDetail } from '../documents/list';
import * as service from '../documents/list/service';
import firebase from 'react-native-firebase';
import handlerNotification from '../../utils/handlerNotification';
import DeviceInfo from 'react-native-device-info';
import utils from '../../service/utils';
import { MESSAGE_TYPE_DIEU_XE } from '../../constants/administrative';
const { actions } = slice;

const requestUserPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    await getToken();
  } catch (error) {
    // Alert.alert("Thông báo", "Có lỗi khi cấu hình gửi thông báo !")
  }
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      await authService.insertFcmToken({
        fcmToken,
        os: Platform.OS,
        version: Platform.Version,
        modelCode: DeviceInfo.getDeviceId(),
      });
    }
  }
};

export const fetchInfo = createOperation({
  options: {
    failedAction: actions.setLogout,
  },
  onError() {
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('otpToken');
    NavigationService.navigate('Auth');
  },
  onSuccess() {
    // NavigationService.navigate('Otp');
    logicDeepLinkAndNavigate();
  },

  onOffline() {
    NavigationService.navigate('AppOff');
  },

  async process({ dispatch }) {
    const userToken = await AsyncStorage.getItem('userToken');
    setHeaders({
      Authorization: `Bearer ${userToken}`,
    });
    const user = await authService.getMe();
    if (!user.deptRoles || user.deptRoles.length === 0) {
      Alert.alert('Thông báo', 'Ứng dụng không hỗ trợ quyền văn thư !', [
        { text: 'OK', style: 'destructive' },
      ]);
      AsyncStorage.removeItem('userToken');
      NavigationService.navigate('Auth');
      actions.logout();
    }
    await requestUserPermission();
    dispatch(actions.setLoggedInUser({ result: user }));
    let defaultUserDeptRole =
      user.deptRoles.find(item => item.isDefaultRole === 1 && item.status === 'active') ||
      user.deptRoles[0];
    dispatch(actions.setDeptRole(defaultUserDeptRole));
    dispatch(actions.setCurrentUserDeptRoleId(defaultUserDeptRole.id));
    setHeaders({
      UserDeptRoleId: defaultUserDeptRole.id,
    });
    const listMenu = await authService.getMenuConfig();
    dispatch(actions.setListMenu(listMenu.data));
  },
});

export const afterValidateOtp = createOperation({
  options: {
    failedAction: actions.setLogout,
  },
  onError() {
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('otpToken');
    NavigationService.navigate('Auth');
  },
  onSuccess() {},

  async process({ dispatch, payload: { otpToken } }) {
    setHeaders({
      OtpJwt: otpToken,
    });
    dispatch(actions.setAuth(true));
    dispatch(fetchInfo());
    await utils.refreshNotificationUnseen();
  },
});

export const afterLogin = createOperation({
  options: {
    failedAction: actions.setLogout,
  },
  onError() {
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('otpToken');
    NavigationService.navigate('Auth');
  },
  onSuccess() {
    // NavigationService.navigate('Otp');
  },

  errorMessage: 'Tài khoản không tồn tại',
  async process({ dispatch, payload: { token } }) {
    setHeaders({
      Authorization: `Bearer ${token}`,
    });
    await dispatch(actions.setAuth(true));
    await dispatch(fetchInfo());
  },
});

const logicDeepLinkAndNavigate = async () => {
  // console.log('logicDeepLinkAndNavigate global.hasDeeplink ' + global.hasDeeplink);
  if (global.remoteMessage) {
    const remoteMessage = { ...global.remoteMessage };
    global.remoteMessage = null;
    handlerNotification(remoteMessage._data);
  }
  if (global.hasDeeplink) {
    let listDeptRoles = [];
    let caseMasterId = '';
    let hcFlow = {};
    try {
      switch (global.deepLinkType) {
        case 'viewDetailDoc':
          let docUserView = null;
          let params = null;
          let data = global.deepLinkData;
          if (parseFloat(data.version) === 2) {
            params = { userDeptRoleId: data.userDeptRoleId };
          } else {
            const paramsDeptRole = {
              userId: data.userId,
              deptId: data.deptId,
              roleId: data.roleId,
            };
            const userDeptRole = await service.userDeptRoleView(paramsDeptRole);
            if (userDeptRole && userDeptRole.data && userDeptRole.data.length > 0) {
              params = { userDeptRoleId: userDeptRole.data[0].id };
            }
          }

          if (!params) return;
          if (data.type === 'in') {
            try {
              global.typeDocDetail = 1;
              docUserView = await service.findByDocIdAndUserDeptRoleId(data.docId, params);
            } catch (error) {
              NavigationService.navigate('App');
              docUserView = null;
            }
          } else {
            try {
              global.typeDocDetail = 2;
              docUserView = await service.findByDocIdAndUserDeptRoleIdWithDocOut(
                data.docId,
                params
              );
            } catch (error) {
              NavigationService.navigate('App');
              docUserView = null;
            }
          }
          if (docUserView && docUserView.data && docUserView.data.length > 0) {
            const vbDocUserDeptId = docUserView.data[0].vbDocUserDeptId;
            const listDeptRoles = store.getState().auth.me.deptRoles;
            for (const i in listDeptRoles) {
              if (listDeptRoles[i].deptId === vbDocUserDeptId) {
                store.dispatch(authActions.changeDeptRole(listDeptRoles[i]));
              }
            }
            store.dispatch(actionsDocumentsDetail.setMode(global.typeDocDetail));
            store.dispatch(actionsDocumentsDetail.viewDetail(docUserView.data[0]));
            NavigationService.navigate('Details', { documentId: docUserView.data[0].docId });
          } else {
            global.hasDeeplink = false;
            Alert.alert(
              'Thông báo',
              'Bạn không có quyền truy cập hoặc văn bản đã bị thu hồi',
              [{ text: 'OK' }],
              {
                cancelable: false,
              }
            );
            NavigationService.navigate('App');
          }
          break;
        case 'viewDetailTask':
          break;

        case 'VIEW_DETAIL_DIEU_XE':
          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(listDeptRoles[i].userDeptRoleId));
            }
          }
          caseMasterId = global.deepLinkData.id;
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.DIEU_XE));
          await Promise.all([
            store.dispatch(detailDatXeActions.getDetailRequest({ caseMasterId })),
            store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
            store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
          ]);
          NavigationService.navigate('DetailDatXe', { caseMasterId });
          break;

        case 'VIEW_DETAIL_DIEU_XE_DX':
          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(global.deepLinkData.userDeptRoleId));
            }
          }
          caseMasterId = global.deepLinkData.id;
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.DIEU_XE_DX));
          await Promise.all([
            store.dispatch(detailDatXeActions.getDetailRequest({ caseMasterId })),
            store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
            store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
          ]);
          NavigationService.navigate('DetailDatXeDX', { caseMasterId });
          break;

        case DEEP_LINK.VIEW_DETAIL_PH:
          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(global.deepLinkData.userDeptRoleId));
            }
          }
          caseMasterId = global.deepLinkData.id;
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.PHONG_HOP));
          await Promise.all([
            store.dispatch(detailActions.getDetailRequest({ caseMasterId })),
            store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
            store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
          ]);
          NavigationService.navigate('Detail', { caseMasterId });
          break;

        case DEEP_LINK.VIEW_DETAIL_PH_DX:
          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(global.deepLinkData.userDeptRoleId));
            }
          }
          caseMasterId = global.deepLinkData.id;
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.PHONG_HOP_DX));
          await Promise.all([
            store.dispatch(detailActions.getDetailRequest({ caseMasterId })),
            store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
            store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
          ]);
          NavigationService.navigate('DetailDX', { caseMasterId });
          break;

        case DEEP_LINK.VIEW_DETAIL_LICH_TUAN:
          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(global.deepLinkData.userDeptRoleId));
            }
          }
          caseMasterId = global.deepLinkData.id;
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.LICH_TUAN));
          await Promise.all([
            store.dispatch(detailLTActions.getDetailRequest({ caseMasterId })),
            store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
            store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
          ]);
          NavigationService.navigate('DetailLT', { caseMasterId });
          break;

        case DEEP_LINK.VIEW_FULL_LICH_TUAN:
          const param = {
            mode: 2,
            flow: FLOW_INFO.LICH_TUAN,
          };

          listDeptRoles = store.getState().auth.me.deptRoles;
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === '' + global.deepLinkData.userDeptRoleId) {
              store.dispatch(authActions.changeDeptRole(global.deepLinkData.userDeptRoleId));
            }
          }
          hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.LICH_TUAN));
          store.dispatch(summaryActions.changeModeLT(param));
          NavigationService.navigate('AdministrativeSummary');

          break;
      }
    } catch (error) {
      global.hasDeeplink = false;
    }
  } else {
    global.hasDeeplink = false;
    NavigationService.navigate('App');
  }
};

export const login = createOperation({
  errorMessage: 'Sai tên đăng nhập/mật khẩu',
  async process({ dispatch, payload: { username, password } }) {
    console.log("Start")
    const token = await authService.login({ username, password });
    console.log(token)
    const androidToken = token;
    console.log(androidToken)
    if (token) {
      await authService
        .getMe1(androidToken)
        .then(async () => {
          await AsyncStorage.setItem('userToken', androidToken);
          setTimeout(() => {
            dispatch(afterLogin({ androidToken }));
          }, 300);
        })
        .catch(err => {
          if (err.response.status === 401) {
            Alert.alert('Thông báo', 'Tài khoản không tồn tại', [
              { text: 'Đóng', style: 'destructive' },
            ]);
          }
        });
    }
  },
});

export const reGenerateOtp = createOperation({
  async process({ dispatch }) {
    await authService.generateOTP().catch(err => {
      const errors = err.response.data.errors;
      const error = errors[0];
      if (error.errorCode === 'otp.existAvailableOTP') {
        Alert.alert('Thông báo', 'Vui lòng thử lại sau 1 phút ', [
          { text: 'Đóng', style: 'destructive' },
        ]);
      } else if (error.errorCode === 'otp.isdnRequired') {
        Alert.alert('Thông báo', 'Tài khoản chưa đăng ký số điện thoại ', [
          { text: 'Đóng', style: 'destructive' },
        ]);
      }
    });
  },
});

export const generateOtp = createOperation({
  async process({ dispatch }) {
    await authService
      .generateOTP()
      .then(async () => {
        // const user = await axios.get('/user').then(res => res.data);
        // await dispatch(actions.setUser(user));
        // NavigationService.navigate('Otp');
      })
      .catch(async err => {
        const errors = err.response.data.errors;
        const error = errors[0];
        if (error.errorCode === 'otp.existAvailableOTP') {
          const user = await axios.get('/user').then(res => res.data);
          await dispatch(actions.setUser(user));
          NavigationService.navigate('Otp');
        } else if (error.errorCode === 'otp.isdnRequired') {
          Alert.alert('Thông báo', 'Tài khoản chưa đăng ký số điện thoại ', [
            { text: 'Đóng', style: 'destructive' },
          ]);
        } else {
          Alert.alert('Thông báo', 'Có lỗi xảy ra ', [{ text: 'Đóng', style: 'destructive' }]);
        }
      });
  },
});

export const validateOtp = createOperation({
  errorMessage: 'Sai OTP',
  async process({ dispatch, payload: { otp } }) {
    await authService
      .validateOTP({ otp })
      .then(async res => {
        const otpToken = res.otpToken;
        await AsyncStorage.setItem('otpToken', otpToken);
        setTimeout(() => {
          dispatch(afterValidateOtp({ otpToken }));
        }, 300);
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 400) {
          Alert.alert('Thông báo', 'Mã OTP không hợp lệ !', [
            { text: 'Đóng', style: 'destructive' },
          ]);
        }
      });
  },
});

export const logout = createOperation({
  async process({ dispatch }) {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      if (fcmToken) {
        await authService.removeFcmToken(fcmToken);
        await AsyncStorage.removeItem('fcmToken');
        firebase.notifications().setBadge(0);
      }
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('otpToken');
      setHeaders({
        Authorization: null,
        UserDeptRoleId: null,
      });
      NavigationService.navigate('Auth');
    } catch (e) {
      Alert.alert('Thông báo', 'Đăng xuất thất bại', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});

export const changeDeptRole = createOperation({
  async process({ dispatch, payload }) {
    let params = payload.id != undefined ? payload.id : payload;
    setHeaders({
      UserDeptRoleId: params,
    });
    const listMenu = await authService.getMenuConfig();
    const listDeptRoles = store.getState().auth.me.deptRoles;
    const deptRoleNew = listDeptRoles.find(deptRole => deptRole.id === params);
    dispatch(actions.setListMenu(listMenu.data));
    dispatch(documentActions.resetNotifications());
    dispatch(actions.setDeptRole(deptRoleNew));
    dispatch(actions.toggleChangeDeptRole());
    await utils.refreshNotificationUnseen();
  },
});

export const changeDeptRoleSwiper = createOperation({
  async process({ dispatch, payload }) {
    let params = payload.id != undefined ? payload.id : payload;
    setHeaders({
      UserDeptRoleId: params,
    });
    const listMenu = await authService.getMenuConfig();
    const listDeptRoles = store.getState().auth.me.deptRoles;
    const deptRoleNew = listDeptRoles.find(deptRole => deptRole.id === params);
    dispatch(actions.setListMenu(listMenu.data));
    dispatch(documentActions.resetNotifications());
    dispatch(actions.setDeptRole(deptRoleNew));
    await utils.refreshNotificationUnseen();
  },
});

export const getMenuConfig = createOperation({
  async process({ dispatch, payload }) {
    const request = await authService.getMenuConfig(payload);
    const a = _.map(request, itemt => items.filter(item => item.title === itemt.menuCode));
    dispatch(actions.menuConfig({ result: a }));
    NavigationService.navigate('HanhChinhModal');
  },
});

export const getMenuItemConfig = createOperation({
  async process({ dispatch, payload }) {
    const request = await authService.getMenuItemConfig(payload);
    const a = _.map(request, itemt => items.filter(item => item.title === itemt.menuCode));
    if (DeviceInfo.isTablet()) {
      const active = ['Theo dõi kết luận chỉ đạo', 'Đặt vé máy bay'];
      const lstActive = _.map(a, items =>
        items.filter(item => Object.values(active).includes(item.title))
      );
      dispatch(actions.menuConfig({ result: lstActive }));
    } else {
      dispatch(actions.menuConfig({ result: a }));
    }
    NavigationService.navigate('HanhChinhModal');
  },
});

export const setRoleId = createOperation({
  async process({ dispatch, payload }) {
    dispatch(actions.roleId(payload));
  },
});

export const setNotifyByRole = count => async dispatch => {
  dispatch(actions.setNotificationByRole(count));
};

export const checkVersion = createOperation({
  async process({ dispatch }) {
    const changeLogs = await authService.checkVersion();
    await dispatch(actions.setChangeLogs(changeLogs));
  },
});
