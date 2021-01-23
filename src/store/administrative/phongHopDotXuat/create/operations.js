import { Toast } from 'native-base';
import { Alert } from 'react-native';
import _ from 'lodash';

import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions as listActions } from 'eoffice/store/administrative/summary';
import { flowIdSelector, flowCodeSelector } from 'eoffice/store/administrative/summary/selectors';
import * as phongHopService from './service';

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const createMeeting = createOperation({
  process: async ({ dispatch, payload, getState }) => {
    const state = getState();
    const serviceList = [];
    _.forEach(payload.services, service => {
      if (service.checked) {
        serviceList.push(service.value);
      }
    });
    const flowId = flowIdSelector(state);
    const flowCode = flowCodeSelector(state);

    const data = {
      flowId,
      flowCode,
      meetingTitle: payload.title,
      meetingContent: payload.content,
      startTime: payload.startDate.getTime(),
      endTime: payload.endDate.getTime(),
      otherInvolved: payload.participant,
      criticalLevel: payload.important.value,
      services: serviceList,
      roomId: payload.room.id,
      note: payload.note,
    };

    try {
      await phongHopService.createMeeting(data);

      reloadData(dispatch);

      Toast.show({
        text: 'Đặt phòng họp thành công',
        type: 'success',
        duration: 3000,
      });

      NavigationService.goBack();
    } catch (e) {
      Alert.alert('Thông báo', 'Đặt phòng họp lỗi', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});
