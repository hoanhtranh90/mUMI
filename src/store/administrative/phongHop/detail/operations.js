import { Toast } from 'native-base';
import { Alert } from 'react-native';

import { actions as listActions } from 'eoffice/store/administrative/summary';
import { ACTION_CODE, FLOW_INFO } from 'eoffice/constants/administrative';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import slice from './slice';
import * as detailService from './service';

const { actions } = slice;

export const getDetailRequest = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.detailSuccess,
    failedAction: actions.detailError,
  },
  process({ payload }) {
    const caseMasterId = payload;
    return detailService.getDetailPH(caseMasterId);
  },
});

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const executeMeeting = createOperation({
  process: async ({ dispatch, payload: { meeting, actionName, actionCode } }) => {
    try {
      let params = {
        ...meeting,
      };
      if (actionCode === ACTION_CODE.PHE_DUYET) {
        params = {
          ...params,
          action: actionCode,
        };
        await detailService.approveMeeting(params);
      } else if (actionCode === ACTION_CODE.TU_CHOI) {
        params = {
          ...params,
          action: actionCode,
        };
        const { action, caseMasterId, note } = params;
        await detailService.approveMeeting({ action, caseMasterId, note });
      } else if (actionCode === ACTION_CODE.CAP_NHAT) {
        await detailService.updateMeeting(params);
      } else if (actionCode === ACTION_CODE.HUY_YEU_CAU) {
        const { caseMasterId, note } = meeting;
        await detailService.cancelMeeting({ caseMasterId, note });
      }

      reloadData(dispatch);

      Toast.show({
        text: `${actionName} phòng họp thành công`,
        type: 'success',
        duration: 3000,
      });

      NavigationService.navigate('Summary');
    } catch (e) {
      Alert.alert('Thông báo', `${actionName} phòng họp lỗi`, [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
  requireConfirm: true,
  confirmTitle: 'Bạn có muốn thực hiện yêu cầu phòng họp?',
});

export const listFreeRooms = createOperation({
  process({ payload: { startTime, endTime } }) {
    const hcFlow = FLOW_INFO.PHONG_HOP;
    const params = {
      startTime,
      endTime,
      hcFlow,
    };
    return detailService.getRoomFree(params);
  },
});
