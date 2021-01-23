import { Alert } from 'react-native';
import { Toast } from 'native-base';

import { actions as listActions } from 'eoffice/store/administrative/summary';
import { ACTION_CODE, FLOW_INFO } from 'eoffice/constants/administrative';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import _ from 'lodash';
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
    return detailService.getDetailDieuXe(caseMasterId);
  },
});

function reloadData(dispatch) {
  dispatch(listActions.reset());
  dispatch(listActions.listRequests());
}

export const executeDatXe = createOperation({
  process: async ({ dispatch, payload: { carRequest, actionName, actionCode } }) => {
    try {
      const listCarIdAndDriver = [];
      if (!_.isEmpty(carRequest.carAndDriverSelected)) {
        _.forEach(carRequest.carAndDriverSelected, obj => {
          const carDriver = {};
          carDriver.carId = obj.carSelected.id;
          carDriver.driverId = obj.driverSelected.id;
          listCarIdAndDriver.push(carDriver);
        });
      }
      let params = {
        caseMasterId: carRequest.caseMasterId,
        note: carRequest.note,
      };
      if (actionCode === ACTION_CODE.PHE_DUYET) {
        params = {
          ...params,
          action: actionCode,
          listCarIdAndDriver,
        };
        await detailService.approveDieuXe(params);
      } else if (actionCode === ACTION_CODE.TU_CHOI) {
        params = {
          ...params,
          action: actionCode,
        };
        const { action, caseMasterId, note } = params;
        await detailService.approveDieuXe({ action, caseMasterId, note });
      } else if (actionCode === ACTION_CODE.CAP_NHAT) {
        params = {
          ...params,
          listCarIdAndDriver,
        };
        await detailService.updateDieuXe(params);
      } else if (actionCode === ACTION_CODE.HUY_YEU_CAU) {
        const { caseMasterId, note } = carRequest;
        await detailService.cancelDieuXe({ caseMasterId, note });
      }

      reloadData(dispatch);

      Toast.show({
        text: `${actionName} đặt xe đột xuất thành công`,
        type: 'success',
        duration: 3000,
      });

      NavigationService.navigate('Summary');
    } catch (e) {
      Alert.alert('Thông báo', `${actionName} đặt xe đột xuất`, [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
  requireConfirm: true,
  confirmTitle: 'Bạn có muốn thực hiện yêu cầu đặt xe đột xuất?',
});

export const listFreeCars = createOperation({
  process({ payload: { startTime, endTime } }) {
    const flowCode = FLOW_INFO.DIEU_XE_DX;
    const params = {
      startTime,
      endTime,
      flowCode,
    };
    return detailService.listFreeCars(params);
  },
});

export const listDrivers = createOperation({
  process() {
    const flowCode = FLOW_INFO.DIEU_XE_DX;
    const params = {
      flowCode,
    };
    return detailService.listDriver(params);
  },
});

export const listCarCalendar = createOperation({
  actions: {
    successAction: actions.listCarCalendarSuccess,
  },
  process({ payload: { startTime, endTime } }) {
    const flowCode = FLOW_INFO.DIEU_XE_DX;
    const params = {
      startTime,
      endTime,
      flowCode,
    };
    return detailService.calendarCar(params);
  },
});
