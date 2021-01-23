import createOperation from 'eoffice/store/createOperation';
import { Toast } from 'native-base';
import { Alert } from 'react-native';
import slice from './slice';
import * as requestsService from './service';
import { querySelector, pageSelector } from './selectors';
import { deptRoleSelector } from '../../auth/selectors';

const { actions } = slice;

export const listRequests = createOperation({
  actions: {
    startAction: actions.listStart,
    successAction: actions.listSuccess,
    failedAction: actions.listError,
  },
  process({ getState }) {
    const state = getState();
    const query = querySelector(state);
    const page = pageSelector(state);

    const params = {
      ...query,
    };

    const queryParams = {
      size: 10,
      page,
    };

    return requestsService.listChiDao(params, queryParams);
  },
});

export const getDetailChiDao = createOperation({
  actions: {
    successAction: actions.getDetailChiDaoSuccess,
  },
  async process({ payload }) {
    const caseMasterId = payload;

    return requestsService.getDetailChiDao(caseMasterId);
  },
});

export const listLDDonVi = createOperation({
  actions: {
    successAction: actions.listLDDVSuccess,
  },
  async process({ getState }) {
    const state = getState();
    const dept = deptRoleSelector(state);
    const params = {
      deptId: dept.deptId,
    };
    return requestsService.getListLDDV(params);
  },
});

export const listDVChuTri = createOperation({
  actions: {
    successAction: actions.listDVCTSuccess,
  },
  async process({ getState }) {
    const state = getState();
    const dept = deptRoleSelector(state);

    const params = {
      deptId: dept.deptId,
    };

    return requestsService.getListDVCT(params);
  },
});

export const searchRequests = createOperation({
  process: ({ dispatch, payload, getState }) => {
    dispatch(actions.reset());
    const state = getState();
    const query = querySelector(state);

    if (payload.meeting) query.meeting = payload.meeting;
    if (payload.sector) query.sector = payload.sector.value;
    if (payload.conclusion) query.conclusion = payload.conclusion;
    if (payload.directiveId) query.directiveId = payload.directiveId.id;
    if (payload.performId) query.performId = payload.performId.id;
    if (payload.deptId) query.deptId = payload.deptId.id;
    if (payload.progress) query.progress = payload.progress.value;
    if (payload.commandsStatus) query.commandsStatus = payload.commandsStatus.value;
    if (payload.startTimeCommand) query.startTimeCommand = payload.startTimeCommand.getTime();
    if (payload.endTimeCommand) query.endTimeCommand = payload.endTimeCommand.getTime();
    if (payload.startTimeDeadline) query.startTimeDeadline = payload.startTimeDeadline.getTime();
    if (payload.endTimeDeadline) query.endTimeDeadline = payload.endTimeDeadline.getTime();
    if (payload.startTimeFinish) query.startTimeFinish = payload.startTimeFinish.getTime();
    if (payload.endTimeFinish) query.endTimeFinish = payload.endTimeFinish.getTime();

    const params = {
      ...query,
    };

    dispatch(actions.setQuery(params));

    dispatch(listRequests());
  },
});

export const updateChiDao = createOperation({
  process: async ({ dispatch, payload }) => {
    const params = {
      action: payload.actionCode,
      caseMasterId: payload.caseMasterId,
      directionContent: payload.directionContent,
      note: payload.note,
    };
    try {
      await requestsService.updateForLD(params);

      dispatch(getDetailChiDao({ caseMasterId: payload.caseMasterId }));

      Toast.show({
        text: 'Gửi yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
    } catch (e) {
      Alert.alert('Thông báo', 'Gửi yêu cầu lỗi', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});
