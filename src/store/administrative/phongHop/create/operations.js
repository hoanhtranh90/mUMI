import _ from 'lodash';
import { Toast } from 'native-base';
import { Alert } from 'react-native';

import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import { actions as listActions } from 'eoffice/store/administrative/summary';
import * as administrativeService from './service';
import { flowIdSelector, flowCodeSelector } from '../../summary/selectors';

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
    };

    try {
      await administrativeService.createMeeting(data);

      reloadData(dispatch);

      Toast.show({
        text: 'Gửi yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });

      NavigationService.goBack();
    } catch (e) {
      Alert.alert('Thông báo', 'Gửi yêu cầu lỗi', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});
