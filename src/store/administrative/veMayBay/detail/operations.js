import { Alert } from 'react-native';
import { Toast } from 'native-base';
import DeviceInfo from 'react-native-device-info'
import { ACTION_CODE } from 'eoffice/constants/administrative';
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
    return detailService.getDetailVeMayBay(caseMasterId);
  },
});

export const getPositionsUser = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.positionsSuccess,
    failedAction: actions.detailError,
  },
  process() {
    // const caseMasterId = payload;
    return detailService.getPositions();
  },
});

export const getAirportsUser = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.detailSuccess,
    failedAction: actions.detailError,
  },
  process() {
    // const caseMasterId = payload;
    return detailService.getAirports();
  },
});

export const getDepartmentsUser = createOperation({
  actions: {
    startAction: actions.detailStart,
    successAction: actions.detailSuccess,
    failedAction: actions.detailError,
  },
  process() {
    // const caseMasterId = payload;
    return detailService.getDepartments();
  },
});

function reloadData(dispatch) {
  dispatch(actions.setSearchKey(''));
}

export const setIsCreate = createOperation({
  process: ({ dispatch, payload }) => {
    if (payload) {
      dispatch(actions.setIsDetail(false))
    }
    dispatch(actions.setIsCreate(payload));
  },
});

export const setIsDetail = createOperation({
  process: ({ dispatch, payload }) => {
    if (payload) {
      dispatch(actions.setIsCreate(false))
    }
    dispatch(actions.setIsDetail(payload));
  },
});

export const setSearchKey = createOperation({
  process: ({ dispatch, payload }) => {
    dispatch(actions.setSearchKey(payload));
  },
});

export const setDisplay = createOperation({
  process: ({ dispatch, payload }) => {
    dispatch(actions.setDisplay(payload));
  },
});


export const executeVeMayBay = createOperation({
  process: async ({ dispatch, payload: { veMayBayRequest, actionName, actionCode } }) => {
    try {
      let params = {
        caseMasterId: veMayBayRequest.caseMasterId,
        note: veMayBayRequest.note,
      };
      debugger
      if (actionCode === ACTION_CODE.PHE_DUYET) {
        const flightRouteList = veMayBayRequest.hcCaseFlightRouteUser.map(flightRoute => {
          const flightRouteTmp = {
            id: flightRoute.id,
            flightTimeRealistic: flightRoute.flightTimeRealistic,
            ticketNumber: flightRoute.ticketNumber,
          };
          return flightRouteTmp;
          // }
        });

        const flightFileList = veMayBayRequest.stateTickets?.files.map(flightFile => {
          const flightFileListTmp = {
            id: flightFile.id,
            fileName: flightFile.fileName,
            fileExtention: flightFile.fileExtention,
          };
          return flightFileListTmp;
          // }
        });
        params = {
          ...params,
          action: actionCode,
          flightRouteList,
          flightFileList,
        };
        await detailService.approveVeMayBay(params);
      } else if (actionCode === ACTION_CODE.TU_CHOI) {
        params = {
          ...params,
          action: actionCode,
        };
        const { action, caseMasterId, note } = params;
        await detailService.approveVeMayBay({ action, caseMasterId, note });
      } else if (actionCode === ACTION_CODE.CAP_NHAT) {
        const flightRouteList = veMayBayRequest.hcCaseFlightRouteUser.map(flightRoute => {
          return {
            id: flightRoute.id,
            flightTimeRealistic: flightRoute.flightTimeRealistic,
            ticketNumber: flightRoute.ticketNumber,
          }
        });

        const flightFileList = veMayBayRequest.stateTickets?.files.map(flightFile => {
          return {
            id: flightFile.attachmentId ? flightFile.attachmentId : flightFile.id,
            fileName: flightFile.fileName,
            fileExtention: flightFile.fileExtention,
          }
        });
        params = {
          ...params,
          action: actionCode,
          flightRouteList,
          flightFileList,
        };
        debugger
        await detailService.updateVeMayBay(params);
      } else if (actionCode === ACTION_CODE.TU_CHOI) {
        params = {
          ...params,
          action: actionCode,
        };
        const { action, caseMasterId, note } = params;
        await detailService.updateVeMayBay({ action, caseMasterId, note });
      } else if (
        actionCode === ACTION_CODE.HUY_YEU_CAU ||
        actionCode === ACTION_CODE.TU_HUY_YEU_CAU
      ) {
        const { caseMasterId, note } = veMayBayRequest;
        const action = actionCode;
        await detailService.cancelVeMayBay({ caseMasterId, action, note });
      }

      if (DeviceInfo.isTablet()) {
        dispatch(actions.setReloadData())
      } else {
        NavigationService.goBack();
      }
      reloadData(dispatch);

      Toast.show({
        text: `${actionName} đặt vé máy bay thành công`,
        type: 'success',
        duration: 3000,
      });


    } catch (e) {
      Alert.alert('Thông báo', `${actionName} đặt vé máy bay`, [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
  requireConfirm: true,
});
