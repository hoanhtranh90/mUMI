import { STATE_CODE } from '../../constants/administrative';
import * as service from './service';
import { endOfWeek, startOfWeek } from 'date-fns';
import _ from 'lodash';
import { initGroupFilters } from 'eoffice/utils/utils';

const getTimeRange = () => {
  let startTime = startOfWeek(new Date(), { weekStartsOn: 1 }).getTime();
  let endTime = endOfWeek(new Date(), { weekStartsOn: 1 }).getTime();
  return { startTime, endTime };
};

const initState = {
  mode: STATE_CODE.CHO_PHE_DUYET,
  hcCalendarDetail: null,
  sendRequests: [],
  acceptedRequests: [],
  needProcessRequests: [],
  sharedRequests: [],
  hcFlows: [],
  currentHcFlow: null,
  listLD: [],
  isShowDetail: false,
  actorsGroup: [],
  query: {
    sort: 'createTime,desc',
    startDate: getTimeRange.startTime,
    endDate: getTimeRange.endTime,
    keyword: '',
    deptId: '',
  },
  queryShared: {
    sort: 'createTime,desc',
    startDate: getTimeRange.startTime,
    endDate: getTimeRange.endTime,
    keyword: '',
  },
};

const ACTION_TYPE = {
  CHANGE_MODE: 'hcCalendar/CHANGE_MODE',
  GET_SEND_REQUESTS: 'hcCalendar/GET_SEND_REQUESTS',
  GET_HC_FLOWS: 'hcCalendar/GET_HC_FLOWS',
  SET_HC_FLOW: 'hcCalendar/SET_HC_FLOW',
  SET_LIST_LD: 'hcCalendar/SET_LIST_LD',
  GET_ACCEPTED_REQUESTS: 'hcCalendar/GET_ACCEPTED_REQUESTS',
  GET_NEED_PROCESS_REQUESTS: 'hcCalendar/GET_NEED_PROCESS_REQUESTS',
  GET_SHARED_REQUESTS: 'hcCalendar/GET_SHARED_REQUESTS',
  GET_DETAIL: 'hcCalendar/GET_DETAIL',
  SET_QUERY: 'hcCalendar/SET_QUERY',
  SET_QUERY_SHARED: 'hcCalendar/SET_QUERY_SHARED',
  SET_ACTOR_GROUP: 'hcCalendar/SET_ACTOR_GROUP',
  CLOSE_DETAIL: 'hcCalendar/CLOSE_DETAIL',
};

export default function(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case ACTION_TYPE.GET_SEND_REQUESTS:
      return {
        ...state,
        sendRequests: action.payload.sendRequests,
      };
    case ACTION_TYPE.SET_HC_FLOW:
      return {
        ...state,
        currentHcFlow: action.payload.hcFlow,
      };
    case ACTION_TYPE.SET_LIST_LD:
      return {
        ...state,
        listLD: action.payload.listLD,
      };
    case ACTION_TYPE.GET_HC_FLOWS:
      return {
        ...state,
        hcFlows: action.payload.hcFlows,
      };
    case ACTION_TYPE.GET_ACCEPTED_REQUESTS:
      return {
        ...state,
        acceptedRequests: action.payload.acceptedRequests,
      };
    case ACTION_TYPE.GET_NEED_PROCESS_REQUESTS:
      return {
        ...state,
        needProcessRequests: action.payload.needProcessRequests,
      };
    case ACTION_TYPE.GET_SHARED_REQUESTS:
      return {
        ...state,
        sharedRequests: action.payload.sharedRequests,
      };
    case ACTION_TYPE.GET_DETAIL:
      return {
        ...state,
        hcCalendarDetail: action.payload.detail,
        isShowDetail: action.payload.isShow,
      };
    case ACTION_TYPE.CLOSE_DETAIL:
      return {
        ...state,
        isShowDetail: action.isShow,
      };
    case ACTION_TYPE.SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };
    case ACTION_TYPE.SET_QUERY_SHARED:
      return {
        ...state,
        queryShared: action.payload.queryShared,
      };
    case ACTION_TYPE.SET_ACTOR_GROUP:
      return {
        ...state,
        actorsGroup: action.payload.actorsGroup,
      };
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

export const openDetail = item => async dispatch => {
  const detail = await service.findById(item.caseMasterId);
  dispatch({
    type: ACTION_TYPE.GET_DETAIL,
    payload: { detail, isShow: true },
  });
};

export const closeDetail = () => async dispatch => {
  dispatch({
    type: ACTION_TYPE.CLOSE_DETAIL,
    isShow: false,
  });
};

export const loadHcFlows = () => async dispatch => {
  const hcFlows = await service.getHcFlows('LICH_TUAN');
  hcFlows.push({ id: 0, deptName: 'Lịch tuần được chia sẻ' });
  dispatch({ type: ACTION_TYPE.GET_HC_FLOWS, payload: { hcFlows } });
  const hcFlow = hcFlows && hcFlows.length > 0 ? hcFlows[0] : null;
  dispatch({ type: ACTION_TYPE.SET_HC_FLOW, payload: { hcFlow } });
  const actorsGroup = await initGroupFilters(
    service.findAllByActorGroup,
    actor => actor.userDeptRoleId
  );
  dispatch({ type: ACTION_TYPE.SET_ACTOR_GROUP, payload: { actorsGroup } });
};

export const changeHcFlow = hcFlowId => async (dispatch, getState) => {
  const hcFlows = getState().hcCalendar.hcFlows;
  const hcFlow = hcFlows.find(item => item.id === hcFlowId);
  dispatch({ type: ACTION_TYPE.SET_HC_FLOW, payload: { hcFlow } });
};

export const loadAcceptedRequests = query => async dispatch => {
  dispatch({ type: ACTION_TYPE.SET_QUERY, payload: { query } });
  let acceptedRequests = await service.getAcceptedRequestsIncludeCoopDepts(query);
  if (!acceptedRequests) acceptedRequests = [];
  dispatch({ type: ACTION_TYPE.GET_ACCEPTED_REQUESTS, payload: { acceptedRequests } });
};

export const getCalendarShared = queryShared => async dispatch => {
  dispatch({ type: ACTION_TYPE.SET_QUERY_SHARED, payload: { queryShared } });
  let sharedRequests = await service.getCalendarShared(queryShared);
  if (!sharedRequests) sharedRequests = [];
  dispatch({ type: ACTION_TYPE.GET_SHARED_REQUESTS, payload: { sharedRequests } });
};
