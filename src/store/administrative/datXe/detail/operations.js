import { Alert } from 'react-native';
import { Toast } from 'native-base';

import { actions as listActions } from 'eoffice/store/administrative/summary';
import { ACTION_CODE, FLOW_INFO } from 'eoffice/constants/administrative';
import createOperation from 'eoffice/store/createOperation';
import NavigationService from 'eoffice/utils/NavigationService';
import _ from 'lodash';
import slice from './slice';
import * as detailService from './service';
import {STATUS} from "../../../../constants/documents";

const { actions } = slice;

export const getDetailRequest = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.detailSuccess,
    failedAction: actions.detailError,
  },
   async process({ payload }) {
    const caseMasterId = payload;
    const result = detailService.getDetailDieuXe(caseMasterId)
    return result;
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
        text: `${actionName} đặt xe thành công`,
        type: 'success',
        duration: 3000,
      });

      NavigationService.navigate('Summary');
    } catch (e) {
      Alert.alert('Thông báo', `${actionName} đặt xe`, [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
  requireConfirm: true,
});

export const listFreeCars = createOperation({
  process({ payload: { startTime, endTime } }) {
    const flowCode = FLOW_INFO.DIEU_XE;
    const params = {
      startTime,
      endTime,
      flowCode,
    };
    return detailService.listFreeCars(params);
  },
});

export const listDrivers = createOperation({
  async process() {
    const flowCode = FLOW_INFO.DIEU_XE;
    const status = 'active'
    const params = {
      flowCode,
      status
    };
    return detailService.listDriver(params);
  },
});

