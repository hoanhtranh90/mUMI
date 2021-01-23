import { Alert } from 'react-native';
import { Toast } from 'native-base';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions as listActions } from 'eoffice/store/administrative/summary';
import * as dieuXeService from './service';
import { flowIdSelector, flowCodeSelector } from '../../summary/selectors';

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const createDieuXe = createOperation({
  process: async ({ dispatch, payload, getState }) => {
    const state = getState();

    const flowId = flowIdSelector(state);
    const flowCode = flowCodeSelector(state);

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
    };

    try {
      await dieuXeService.createDieuXe(data);

      reloadData(dispatch);
      Toast.show({
        text: 'Tạo yêu cầu điều xe đơn vị thành công',
        type: 'success',
        duration: 2000,
      });

      NavigationService.goBack();
    } catch (e) {
      console.log(e)
      Alert.alert('Thông báo', 'Tạo yêu cầu điều xe đơn vị lỗi', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
});
