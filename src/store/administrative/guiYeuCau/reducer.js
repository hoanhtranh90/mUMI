import NavigationService from 'eoffice/utils/NavigationService';
import * as service from './service';
import {STATUS_CODE} from "../../../constants/administrative";
import items from "../../../screens/administrative/HanhChinhModal/items";

const initState = {
  mode: 1,
  editMode: 1,
  listProcessedRequest: [],
  listProcessingRequest: [],
  requestDetail: null,
  isCanAcceptRequest: false,
  isCanCancelRequest: false,
  cancelActionCode: null,
  listData: [],
};

const ACTION_TYPE = {
  CHANGE_MODE: 'sendRequest/CHANGE_MODE',
  CHANGE_EDIT_MODE: 'sendRequest/CHANGE_EDIT_MODE',
  SET_PROCESSED_REQUEST: 'sendRequest/SET_PROCESSED_REQUEST',
  SET_PROCESSING_REQUEST: 'sendRequest/SET_PROCESSING_REQUEST',
  SET_DETAIL_REQUEST: 'sendRequest/SET_DETAIL_REQUEST',
  SET_IS_CAN_ACCEPT_REQUEST: 'sendRequest/SET_IS_CAN_ACCEPT_REQUEST',
  SET_IS_CAN_CANCEL_REQUEST: 'sendRequest/SET_IS_CAN_CANCEL_REQUEST',
  SET_CANCEL_ACTION_CODE: 'sendRequest/SET_CANCEL_ACTION_CODE',
  GET_DATA : 'sendRequest/GET_DATA',
  ADD_DATA: 'sendRequest/ADD_DATA',
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
        requestDetail: action.payload.requestDetail,
      };
    case ACTION_TYPE.CHANGE_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload.editMode,
      };
    case ACTION_TYPE.SET_PROCESSED_REQUEST:
      return {
        ...state,
        listProcessedRequest: action.payload.listProcessedRequest
      };
    case ACTION_TYPE.SET_PROCESSING_REQUEST:
      return {
        ...state,
        listProcessingRequest: action.payload.listProcessingRequest,
      };
    case ACTION_TYPE.GET_DATA:
      return {
        ...state,
        listData: action.payload.listData,
      }
    case ACTION_TYPE.ADD_DATA:
      return {
        ...state,
        listData: [...state.listData, action.payload.item],
      }
    default:
      return state;
  }
}

export const changeMode = mode => async dispatch => {
  dispatch({
    type: ACTION_TYPE.CHANGE_MODE,
    payload: { mode },
  });
};

export const addData = item => async dispatch => {
  await service.addItem(item)
  dispatch({
    type: ACTION_TYPE.ADD_DATA,
    payload: { item },
  });
  await getData()
  NavigationService.goBack();
}

export const openCreateRequest = item => async dispatch => {
  dispatch({ type: ACTION_TYPE.SET_DETAIL_REQUEST, payload: { requestDetail: item } });
  dispatch({ type: ACTION_TYPE.CHANGE_EDIT_MODE, payload: { editMode: (item === null) ? 1 : 2} });
  NavigationService.navigate('CreateRequestForm');
};

export const getData = () => async dispatch => {
  let listData = await service
        .getData()
  let listProcessedRequest = listData.filter(item => item.status !== STATUS_CODE.DANGXULY);
  let listProcessingRequest = listData.filter(item => item.status === STATUS_CODE.DANGXULY);
  dispatch({
    type: ACTION_TYPE.GET_DATA,
    payload: { listData },
  });
  dispatch({
    type: ACTION_TYPE.SET_PROCESSING_REQUEST,
    payload: { listProcessingRequest },
  });
  dispatch({
    type: ACTION_TYPE.SET_PROCESSED_REQUEST,
    payload: { listProcessedRequest },
  });
};
