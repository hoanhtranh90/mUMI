import * as service from './service';
import NavigationService from 'eoffice/utils/NavigationService';
import { Toast } from 'native-base';
import { selectors } from '../../auth';

const initState = {
  mode: 1,
  editMode: 1,
  listProcessedRequest: [],
  listProcessingRequest: [],
  vanPhongPhamDetail: null,
  isCanAcceptRequest: false,
  isCanCancelRequest: false,
  cancelActionCode: null,
};

const ACTION_TYPE = {
  CHANGE_MODE: 'vanPhongPham/CHANGE_MODE',
  CHANGE_EDIT_MODE: 'vanPhongPham/CHANGE_EDIT_MODE',
  SET_PROCESSED_REQUEST: 'vanPhongPham/SET_PROCESSED_REQUEST',
  SET_PROCESSING_REQUEST: 'vanPhongPham/SET_PROCESSING_REQUEST',
  SET_DETAIL_REQUEST: 'vanPhongPham/SET_DETAIL_REQUEST',
  SET_IS_CAN_ACCEPT_REQUEST: 'vanPhongPham/SET_IS_CAN_ACCEPT_REQUEST',
  SET_IS_CAN_CANCEL_REQUEST: 'vanPhongPham/SET_IS_CAN_CANCEL_REQUEST',
  SET_CANCEL_ACTION_CODE: 'vanPhongPham/SET_CANCEL_ACTION_CODE',
};

export default function(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_CANCEL_ACTION_CODE:
      return {
        ...state,
        cancelActionCode: action.payload.cancelActionCode,
      };
    case ACTION_TYPE.SET_IS_CAN_ACCEPT_REQUEST:
      return {
        ...state,
        isCanAcceptRequest: action.payload.isCanAcceptRequest,
      };
    case ACTION_TYPE.SET_IS_CAN_CANCEL_REQUEST:
      return {
        ...state,
        isCanCancelRequest: action.payload.isCanCancelRequest,
      };
    case ACTION_TYPE.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case ACTION_TYPE.SET_DETAIL_REQUEST:
      return {
        ...state,
        vanPhongPhamDetail: action.payload.vanPhongPhamDetail,
      };
    case ACTION_TYPE.CHANGE_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload.editMode,
      };
    case ACTION_TYPE.SET_PROCESSED_REQUEST:
      return {
        ...state,
        listProcessedRequest: action.payload.listProcessedRequest,
      };
    case ACTION_TYPE.SET_PROCESSING_REQUEST:
      return {
        ...state,
        listProcessingRequest: action.payload.listProcessingRequest,
      };
    default:
      return state;
  }
}

export const getProcessedRequest = params => async (dispatch, getState) => {
  const listProcessedRequest = await service.getProcessedRequest(params);
  let deptRole = selectors.deptRoleSelector(getState());
  let result;
  if (deptRole.roleCode === 'THVPP') {
    result = listProcessedRequest.filter(
      item =>
        (item.parentDeptId === deptRole.parentDeptId && item.approveStatus !== 3) ||
        item.creatorId === deptRole.id
    );
  } else {
    result = listProcessedRequest.filter(item => item.creatorId === deptRole.id);
  }
  dispatch({
    type: ACTION_TYPE.SET_PROCESSED_REQUEST,
    payload: { listProcessedRequest: result ? result : [] },
  });
};

export const getProcessingRequest = params => async (dispatch, getState) => {
  const listProcessingRequest = await service.getProcessingRequest(params);

  let deptRole = selectors.deptRoleSelector(getState());
  let result;
  if (deptRole.roleCode === 'THVPP') {
    result = listProcessingRequest.filter(
      item => item.parentDeptId === deptRole.parentDeptId || item.creatorId === deptRole.id
    );
  } else {
    result = listProcessingRequest.filter(item => item.creatorId === deptRole.id);
  }

  dispatch({
    type: ACTION_TYPE.SET_PROCESSING_REQUEST,
    payload: { listProcessingRequest: result ? result : [] },
  });
};

export const changeMode = mode => async dispatch => {
  dispatch({
    type: ACTION_TYPE.CHANGE_MODE,
    payload: { mode },
  });
};

export const openCreateRequest = () => async dispatch => {
  dispatch({ type: ACTION_TYPE.SET_DETAIL_REQUEST, payload: { vanPhongPhamDetail: null } });
  dispatch({ type: ACTION_TYPE.CHANGE_EDIT_MODE, payload: { editMode: 1 } });
  NavigationService.navigate('VanPhongPhamCreateEdit');
};

export const getVanPhongPhamDetail = caseMasterId => async (dispatch, getState) => {
  let detail = await service.findById(caseMasterId);
  dispatch({ type: ACTION_TYPE.SET_DETAIL_REQUEST, payload: { vanPhongPhamDetail: detail } });
  dispatch({ type: ACTION_TYPE.CHANGE_EDIT_MODE, payload: { editMode: 2 } });

  let deptRole = selectors.deptRoleSelector(getState());
  let isCanCancelRequest =
    detail.status === 1 && (detail.creatorId === deptRole.id || deptRole.roleCode === 'THVPP');

  let isCanAcceptRequest = detail.status === 1 && deptRole.roleCode === 'THVPP';

  dispatch({ type: ACTION_TYPE.SET_IS_CAN_CANCEL_REQUEST, payload: { isCanCancelRequest } });
  dispatch({ type: ACTION_TYPE.SET_IS_CAN_ACCEPT_REQUEST, payload: { isCanAcceptRequest } });
  NavigationService.navigate('VanPhongPhamDetail');
};

export const createRequest = form => async dispatch => {
  await service
    .createYC(form)
    .then(async res => {
      Toast.show({
        text: 'Gửi yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      await dispatch(changeMode(1));
      await dispatch(getProcessingRequest({}));
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const approveRequest = id => async dispatch => {
  await service
    .approveRequest(id)
    .then(async res => {
      Toast.show({
        text: 'Phê duyệt yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      await dispatch(changeMode(1));
      await dispatch(getProcessingRequest({}));
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const cancelRequest = note => async (dispatch, getState) => {
  let form = {};
  form.note = note;
  let id = getState().vanPhongPham.vanPhongPhamDetail.id;
  await service
    .cancelRequest({ id, note })
    .then(async res => {
      Toast.show({
        text: 'Hủy yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      await dispatch(changeMode(1));
      await dispatch(getProcessingRequest({}));
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};
