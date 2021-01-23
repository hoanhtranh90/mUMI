import { Alert } from 'react-native';
import { Toast } from 'native-base';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions } from '../detail';
import * as veMayBayService from './service';
import { flowIdSelector, flowCodeSelector } from '../../summary/selectors';
import DeviceInfo from "react-native-device-info";

function reloadData(dispatch) {
  dispatch(actions.setSearchKey(''));
}

export const createVeMayBay = createOperation({
  process: async ({ dispatch, payload, getState }) => {
    const state = getState();
    const flowId = flowIdSelector(state);
    const flowCode = flowCodeSelector(state);
    const data = {
      flowId,
      flowCode,
      requestName: payload.requestName,
      requestContent: payload.requestContent,
      flightRouteList: payload.flightRouteList,
      flightUserList: payload.flightUserList,
      flightFileList: payload.flightFileList,
    };
    try {
      veMayBayService.createVeMayBay(data);
      Toast.show({
        text: 'Tạo yêu cầu đặt vé máy bay thành công',
        type: 'success',
        duration: 2000,
      });
      if (DeviceInfo.isTablet()) {
        dispatch(actions.setReloadData())
      } else {
        NavigationService.goBack();
      }
    } catch (e) {
      Alert.alert('Thông báo', 'Tạo yêu cầu đặt vé máy bay lỗi', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
});
