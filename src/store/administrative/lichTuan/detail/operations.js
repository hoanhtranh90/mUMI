import { Toast } from 'native-base';
import { Alert } from 'react-native';

import { actions as listActions } from 'eoffice/store/administrative/summary';
import { ACTION_CODE } from 'eoffice/constants/administrative';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import slice from './slice';
import * as detailService from './service';
import { meSelector } from '../../../auth/selectors';
import store from '../../../../store/index';
import _ from 'lodash';

const { actions } = slice;

export const getDetailRequest = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.detailSuccess,
    failedAction: actions.detailError,
  },
  async process({dispatch, payload }) {
    const caseMasterId = payload;
    let detail =  await detailService.getDetailLT(caseMasterId);
    detail.attachments = await detailService.getAttachmentHcCalendar(caseMasterId);
    return detail;
  },
});

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const executeSchedule = createOperation({
  process: async ({ dispatch, payload: { schedule, actionName, actionCode } }) => {
    try {
      let params = {
        ...schedule,
      };
      if (actionCode === ACTION_CODE.PHE_DUYET) {
        params = {
          ...params,
          action: actionCode,
        };
        await detailService.approveSchedule(params);
      } else if (actionCode === ACTION_CODE.TU_CHOI) {
        params = {
          ...params,
          action: actionCode,
        };
        const { action, caseMasterId, note } = params;
        await detailService.approveSchedule({ action, caseMasterId, note });
      } else if (actionCode === ACTION_CODE.CAP_NHAT) {
        await detailService.updateSchedule(params);
      } else if (
        actionCode === ACTION_CODE.HUY_YEU_CAU ||
        actionCode === ACTION_CODE.TU_HUY_YEU_CAU
      ) {
        const { caseMasterId, note } = schedule;
        params = {
          action: actionCode,
          caseMasterId: `${caseMasterId}`,
          note: `${note}`,
        };
        await detailService.cancelSchedule(params);
      }

      reloadData(dispatch);

      Toast.show({
        text: `${actionName} lịch tuần thành công`,
        type: 'success',
        duration: 3000,
      });

      NavigationService.navigate('Summary');
    } catch (e) {
      Alert.alert('Thông báo', `${actionName} lịch tuần lỗi`, [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
  // requireConfirm: true,
  // confirmTitle: 'Bạn có muốn thực hiện yêu cầu lịch tuần?',
});

export const listFreeRooms = createOperation({
  process({ payload: { startTime, endTime } }) {
    const params = {
      startTime,
      endTime,
    };
    return detailService.getRoomFree(params);
  },
});

export const listLanhDao = createOperation({
  async process({ getState }) {
    const state = getState();
    const dept = meSelector(state);

    let parent = '';

    _.forEach(dept.deptRoles, obj => {
      if (obj.id === store.getState().auth.deptRole.id) {
        parent = obj.parentDeptId;
      }
    });

    // console.log(global.deptSelected);
    const params = {
      deptId:
        global.deptSelected === undefined ||
        global.deptSelected === '' ||
        global.deptSelected === null
          ? global.deptId
          : global.deptSelected,
    };
    return detailService.getlistLanhDao(params);
  },
});

export const listDVPH = createOperation({
  async process({ getState }) {
    const state = getState();
    const dept = meSelector(state);

    let parent = '';

    _.forEach(dept.deptRoles, obj => {
      if (obj.id === store.getState().auth.deptRole.id) {
        parent = obj.parentDeptId;
      }
    });

    // console.log(global.deptSelected);
    const params = {
      deptId:
        global.deptSelected === undefined ||
        global.deptSelected === '' ||
        global.deptSelected === null
          ? global.deptId
          : global.deptSelected,
    };
    return detailService.getListDVPH(params);
  },
});

export const listcalendarRoomDetail = createOperation({
  action: {
    successAction: actions.listcalendarRoomDetailSuccess,
  },
  process({ payload: { startTime, endTime } }) {
    const params = {
      startTime,
      endTime,
    };

    return detailService.calendarRoomDetail(params);
  },
});
