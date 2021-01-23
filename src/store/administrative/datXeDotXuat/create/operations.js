import { Alert } from 'react-native';
import { Toast } from 'native-base';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions as listActions } from 'eoffice/store/administrative/summary';
import _ from 'lodash';
import * as dieuXeService from './service';
import { flowIdSelector, flowCodeSelector } from '../../summary/selectors';

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const createDieuXeDX = createOperation({
  process: async ({ dispatch, payload, getState }) => {
    const state = getState();

    const flowId = flowIdSelector(state);
    const flowCode = flowCodeSelector(state);

    const listCarIdAndDriver = [];
    if (!_.isEmpty(payload.carAndDriverSelected)) {
      _.forEach(payload.carAndDriverSelected, obj => {
        const carDriver = {};
        carDriver.carId = obj.carSelected.id;
        carDriver.driverId = obj.driverSelected.id;
        listCarIdAndDriver.push(carDriver);
      });
    }

    const data = {
      flowId,
      flowCode,
      title: payload.title,
      content: payload.content,
      startTime: payload.startTime.getTime(),
      endTime: payload.endTime.getTime(),
      fromPlace: payload.fromPlace,
      toPlace: payload.toPlace,
      numberOfPeople: payload.numberOfPeople,
      contactNumber: payload.contactNumber,
      requestType: payload.requestType.value,
      note: payload.note,
      listCarIdAndDriver,
    };

    try {
      await dieuXeService.createDieuXeDX(data);

      reloadData(dispatch);
      Toast.show({
        text: 'Điều xe đột xuất thành công',
        type: 'success',
        duration: 2000,
      });

      NavigationService.goBack();
    } catch (e) {
      Alert.alert('Thông báo', 'Điều xe đột xuất lỗi', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});
