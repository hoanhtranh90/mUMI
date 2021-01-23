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

export const createSchedule = createOperation({
  process: async ({ dispatch, payload, getState }) => {
    const state = getState();

    // const flowId = flowIdSelector(state);
    const flowCode = flowCodeSelector(state);

    const data = {
      flowId: global.flowId,
      flowCode,
      meetingTitle: payload.title,
      meetingContent: payload.content,
      startTime: payload.startDate.getTime(),
      endTime: payload.endDate.getTime(),
      meetingPlace: payload.place,
      leaderIds: payload.listLanhDao,
      cooperateDeptIds: payload.listPH,
      otherInvolved: payload.participant,
      chairedUnit: payload.chaired,
      chairedUnitId: payload.listCT[0],
      videoConferenceUnit: payload.videoc,
      isNeedRoom: payload.rqMores[0]?.checked,
      roomId: payload.room?.id,
      deptId: global.deptSelected,
      meetingType: payload.meetingType,
    };

    try {
      await administrativeService.createSchedule(data);
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
