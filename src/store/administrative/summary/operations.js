import createOperation from 'eoffice/store/createOperation';
import { endOfWeek, startOfWeek } from 'date-fns';
import { ADMINISTRATIVE_TYPE, FLOW_INFO, ROLE_CODE } from 'eoffice/constants/administrative';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import slice from './slice';
import * as requestsService from './service';
import { modeSelector, querySelector, flowCodeSelector, hcFlowSelector } from './selectors';
import store from '../..';
import { meSelector } from '../../auth/selectors';
import _ from 'lodash';
import * as hcCalendarService from '../../hcCalendar/service';
import { initGroupFilters } from 'eoffice/utils/utils';

const { actions } = slice;

export const listRequests = createOperation({
  actions: {
    startAction: actions.listStart,
    successAction: actions.listSuccess,
    failedAction: actions.listError,
  },
  // eslint-disable-next-line no-unused-vars
  async process({ dispatch, getState, payload }) {
    const state = getState();
    const query = querySelector(state);
    const mode = modeSelector(state);
    const flowCode = flowCodeSelector(state);
    const hcFlow = hcFlowSelector(state);
    const onlyShared = payload?.onlyShared || false;
    // const dept = meSelector(state);
    // let parent = '';

    // _.forEach(dept.deptRoles, obj => {
    //   if (obj.id === store.getState().auth.deptRole.id) {
    //     parent = obj.parentDeptId;
    //   }
    // });

    let listDeptRoles = [];
    const roleId = selectors.getRoleId(state);

    query.flowCode = flowCode;
    query.includeShared = true;
    const params = {
      ...query,
      size: 1000,
    };
    if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
      const actorsGroup = await initGroupFilters(
        requestsService.findAllByActorGroup,
        actor => actor.userDeptRoleId
      );
      dispatch(actions.setActorsGroup({ actorsGroup: actorsGroup || [] }));
      const today = new Date();
      const startDate = new Date(startOfWeek(today)).getTime();
      const endDate = new Date(endOfWeek(today)).getTime();
      if (!params.isSearch) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      listDeptRoles = store.getState().auth.me.deptRoles;
      if (mode === ADMINISTRATIVE_TYPE.PENDING) {
        if (hcFlow.flowName) {
          return requestsService.listSentRequests(params);
        }

        if (global.hasDeeplink) {
          for (const i in listDeptRoles) {
            if (listDeptRoles[i].userDeptRoleId === `${global.deepLinkData.userDeptRoleId}`) {
              store.dispatch(authActions.changeDeptRole(listDeptRoles[i]));
              if (listDeptRoles[i].roleCode === ROLE_CODE.TONG_HOP_LICH_TUAN) {
                global.hasDeeplink = false;
                return requestsService.listNeedProcessRequests(params);
              }
              global.hasDeeplink = false;
              return requestsService.listSentRequests(params);
            }
          }
          // return requestsService.listNeedProcessRequests(params);
        } else {
          if (roleId === ROLE_CODE.TONG_HOP_LICH_TUAN) {
            return requestsService.listSentRequests(params);
          }
          // return requestsService.listNeedProcessRequests(params);
          return requestsService.listSentRequests(params);
        }
      }
      let listAcceptedRequests = await requestsService.listAcceptedRequests({
        ...params,
        deptId:
          onlyShared || global.selectDeptForViewLT === 0
            ? ''
            : global.selectDeptForViewLT === undefined ||
              global.selectDeptForViewLT === '' ||
              global.selectDeptForViewLT === null
            ? global.deptId
            : global.selectDeptForViewLT,
      });

      // dispatch(actions.listCalendarSuccess({ result: listAcceptedRequests }));

      dispatch(actions.listCalendarSuccess({ result: listAcceptedRequests }));
      return [];
    }
    if (mode === ADMINISTRATIVE_TYPE.PENDING) {
      return requestsService.listPendingRequest(params);
    }
    return requestsService.listDoneRequest(params);
  },
});

export const searchRequests = createOperation({
  process: ({ dispatch, payload, getState }) => {
    console.log('searchRequests');
    dispatch(actions.reset());
    const state = getState();
    const paginate = querySelector(state);
    paginate.startTime = payload.startDate.getTime();
    paginate.endTime = payload.endDate.getTime();
    paginate.startDate = payload.startDate.getTime();
    paginate.endDate = payload.endDate.getTime();
    paginate.isSearch = payload.isSearch;
    const params = {
      ...paginate,
    };

    dispatch(actions.setQuery(params));

    dispatch(listRequests());
  },
});

export const changeMode = createOperation({
  process: ({ dispatch, payload }) => {
    dispatch(actions.setMode(payload));
    dispatch(actions.reset());

    dispatch(listRequests());
  },
});

export const changeModeLT = createOperation({
  process: ({ dispatch, payload }) => {
    dispatch(actions.setMode(payload?.mode));
    dispatch(actions.reset());
    dispatch(listRequests({ onlyShared: payload?.onlyShared }));
  },
});

export const getFlowInfo = createOperation({
  actions: {
    successAction: actions.getHcFlowSuccess,
  },
  process: async ({ payload }) => {
    const params = {
      flowCode: payload,
    };
    return requestsService.getFlowInfo(params);
  },
});

export const listAvailableActions = createOperation({
  actions: {
    successAction: actions.listActionsSuccess,
  },
  async process({ payload }) {
    const caseMasterId = payload;
    return requestsService.getAvailableActions(caseMasterId);
  },
});

export const getCurrentState = createOperation({
  actions: {
    successAction: actions.getCurrentStateSuccess,
  },
  async process({ payload }) {
    const caseMasterId = payload;

    return requestsService.getCurrentState(caseMasterId);
  },
});

export const getFlowsCanStart = createOperation({
  actions: {
    successAction: actions.getHcFlowsCanStart,
  },
  process({ payload }) {
    const params = {
      flowCode: payload,
    };

    return requestsService.getFlowsCanStart(params);
  },
});

export const getFlowsAvailable = createOperation({
  actions: {
    successAction: actions.getHcFlowsAvailable,
  },
  process({ payload }) {
    const params = {
      flowCode: payload,
    };
    return requestsService.getFlowsAvailable(params);
  },
});
