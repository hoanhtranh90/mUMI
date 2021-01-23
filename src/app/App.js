import React from 'react';
import { Platform, Linking, Alert, Dimensions, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider, Root } from 'native-base';
import KeyboardManager from 'react-native-keyboard-manager';
import { ReduxNetworkProvider } from 'react-native-offline';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
import { FLOW_INFO, DEEP_LINK } from 'eoffice/constants/administrative';
import { da } from 'date-fns/locale';
import NavigationService from '../utils/NavigationService';
import getTheme from '../native-base-theme/components';
import colors from '../native-base-theme/variables/commonColor';
import store from '../store';
import AppLoading from './AppLoading.container';
import * as service from '../store/documents/list/service';
import { actions as summaryActions } from 'eoffice/store/administrative/summary';
import { actions as detailDatXeActions } from 'eoffice/store/administrative/datXe/detail';
import { actions as detailActions } from 'eoffice/store/administrative/phongHop/detail';
import { actions as detailLTActions } from 'eoffice/store/administrative/lichTuan/detail';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import { MenuProvider } from 'react-native-popup-menu';



import { actions } from '../store/documents/list';
import HandleNotifications from './HandleNotifications';
// import OfflineNotice from './OfflineNotice';

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarDoneBarButtonItemText('Đóng');
}


let AppNavigator;

if (Platform.OS === 'ios') {
  if (DeviceInfo.isTablet()) {
    Orientation.lockToLandscape();
    AppNavigator = require('./AppNavigator.tablet').default;
  } else {
    Orientation.lockToPortrait();
    AppNavigator = require('./AppNavigator.mobile').default;
  }
} else {
  if (aspectRatio > 1.4) {
    // Code for phone
    AppNavigator = require('./AppNavigator.mobile').default;
    Orientation.lockToPortrait();
  } else {
    // Code for tab
    AppNavigator = require('./AppNavigator.tablet').default;
    Orientation.lockToLandscape();
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentWillMount() {
    Linking.getInitialURL()
      .then(url => this.handleOpenURL({ url }))
      .catch(console.error);
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentDidMount() {

  }


  handleOpenURL = async event => {
    const authState = store.getState().auth;
    try {
      if (event.url) {
        // console.log(event.url);
        let listDeptRoles = [];
        let caseMasterId = '';
        let hcFlow = {};

        const _locationApp = 'mobieoffice://';
        const valueParams = event.url.split(_locationApp)[1];
        const type = valueParams.split('?')[0];
        // console.log(`type ${type}`);
        let data = null;
        if (Platform.OS === 'android') {
          const dataSplit = valueParams.split('?')[1].split('/');
          const objectConverted = {};
          for (const i in dataSplit) {
            const items = dataSplit[i].split('=');
            if (items[0] && items[0]) {
              objectConverted[`${items[0]}`] = items[1];
            }
          }
          data = objectConverted;
        } else {
          data = JSON.parse(
            `{"${valueParams
              .split('?')[1]
              .replace(/&/g, '","')
              .replace(/=/g, '":"')}"}`,
            (key, value) => (key === '' ? value : decodeURIComponent(value))
          );
        }

        global.hasDeeplink = true;
        global.deepLinkType = type;
        global.deepLinkData = data;
        if (authState.auth) {
          switch (type) {
            case 'viewDetailDoc':
              let docUserView = null;
              let params = null;
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
                global.typeDocDetail = 1;
                docUserView = await service.findByDocIdAndUserDeptRoleId(data.docId, params);
              } else {
                global.typeDocDetail = 2;
                docUserView = await service.findByDocIdAndUserDeptRoleIdWithDocOut(
                  data.docId,
                  params
                );
              }
              if (docUserView && docUserView.data && docUserView.data.length > 0) {
                const vbDocUserDeptId = docUserView.data[0].vbDocUserDeptId;
                const listDeptRoles = store.getState().auth.me.deptRoles;
                for (const i in listDeptRoles) {
                  if (listDeptRoles[i].deptId === vbDocUserDeptId) {
                    store.dispatch(authActions.changeDeptRole(listDeptRoles[i]));
                  }
                }
                store.dispatch(actions.setMode(global.typeDocDetail));
                store.dispatch(actions.viewDetail(docUserView.data[0]));
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
              }
              break;
            case 'viewDetailTask':
              break;
            case DEEP_LINK.VIEW_DETAIL_DIEU_XE:
              listDeptRoles = store.getState().auth.me.deptRoles;
              for (const i in listDeptRoles) {
                if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                  store.dispatch(authActions.changeDeptRole(listDeptRoles[i].userDeptRoleId));
                }
              }
              caseMasterId = data.id;
              hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.DIEU_XE));
              await Promise.all([
                store.dispatch(detailDatXeActions.getDetailRequest({ caseMasterId })),
                store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
                store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
              ]);
              NavigationService.navigate('DetailDatXe', { caseMasterId });
              break;

            case DEEP_LINK.VIEW_DETAIL_DIEU_XE_DX:
              listDeptRoles = store.getState().auth.me.deptRoles;
              for (const i in listDeptRoles) {
                if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                  store.dispatch(authActions.changeDeptRole(data.userDeptRoleId));
                }
              }
              caseMasterId = data.id;
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
                if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                  store.dispatch(authActions.changeDeptRole(data.userDeptRoleId));
                }
              }
              caseMasterId = data.id;
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
                if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                  store.dispatch(authActions.changeDeptRole(data.userDeptRoleId));
                }
              }
              caseMasterId = data.id;
              hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.PHONG_HOP_DX));
              await Promise.all([
                store.dispatch(detailActions.getDetailRequest({ caseMasterId })),
                store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
                store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
              ]);
              NavigationService.navigate('DetailDX', { caseMasterId });
              break;

            case DEEP_LINK.VIEW_DETAIL_LICH_TUAN:
              if (DeviceInfo.isTablet()) {
                NavigationService.navigate('LichTuan');
              } else {
                listDeptRoles = store.getState().auth.me.deptRoles;
                for (const i in listDeptRoles) {
                  if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                    store.dispatch(authActions.changeDeptRole(data.userDeptRoleId));
                  }
                }
                caseMasterId = data.id;
                hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.LICH_TUAN));
                await Promise.all([
                  store.dispatch(detailLTActions.getDetailRequest({ caseMasterId })),
                  store.dispatch(summaryActions.listAvailableActions({ caseMasterId })),
                  store.dispatch(summaryActions.getCurrentState({ caseMasterId })),
                ]);
                NavigationService.navigate('DetailLT', { caseMasterId });
              }
              break;

            case DEEP_LINK.VIEW_FULL_LICH_TUAN:
              if (DeviceInfo.isTablet()) {
                NavigationService.navigate('LichTuan');
              } else {
                const param = {
                  mode: 2,
                  flow: FLOW_INFO.LICH_TUAN,
                };
                listDeptRoles = store.getState().auth.me.deptRoles;
                for (const i in listDeptRoles) {
                  if (listDeptRoles[i].userDeptRoleId === `${data.userDeptRoleId}`) {
                    store.dispatch(authActions.changeDeptRole(data.userDeptRoleId));
                  }
                }
                hcFlow = await store.dispatch(summaryActions.getFlowInfo(FLOW_INFO.LICH_TUAN));
                store.dispatch(summaryActions.changeModeLT(param));
                NavigationService.navigate('AdministrativeSummary');
              }

              break;
          }
        }
        return;
      }
      global.hasDeeplink = false;
    } catch (error) {
      // console.log(error);
      global.hasDeeplink = false;
      if (error && error.response) {
        const status = error.response.status;
        let message = null;
        switch (status) {
          case 403:
            message = 'Bạn không có quyền truy cập hoặc văn bản đã bị thu hồi';
            break;
          default:
            message = 'Lỗi không xác định';
            break;
        }
        Alert.alert('Thông báo', message, [{ text: 'OK' }], {
          cancelable: false,
        });
      } else {
        Alert.alert('Thông báo', 'Lỗi không xác định', [{ text: 'OK' }], {
          cancelable: false,
        });
      }
    }
  };



  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <ReduxNetworkProvider>
          <StyleProvider style={getTheme(colors)}>
            <Root>
              <MenuProvider>
                <AppNavigator
                  ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
                />
                <HandleNotifications />
              </MenuProvider>
            </Root>
          </StyleProvider>
          {/* <OfflineNotice /> */}
          <AppLoading />
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}
