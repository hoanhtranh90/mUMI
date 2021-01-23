import { connect } from 'react-redux';
import { actions as summaryActions, selectors } from 'eoffice/store/administrative/summary';
import { actions as detailActions } from 'eoffice/store/administrative/phongHop/detail';
import { actions as detailDatXeActions } from 'eoffice/store/administrative/datXe/detail';
import { actions as detailLTActions } from 'eoffice/store/administrative/lichTuan/detail';
import { actions as detailVeMayBayActions } from 'eoffice/store/administrative/veMayBay/detail';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import Requests from './Requests';

export default connect(
  state => ({
    requests: selectors.requestsSelector(state),
    loading: selectors.isLoadingSelector(state),
    mode: selectors.modeSelector(state),
    hasMore: selectors.hasMoreSelector(state),
    query: selectors.querySelector(state),
    actorsGroup: selectors.actorsGroupSelector(state),
  }),
  (dispatch, ownProps) => ({
    listRequests: flow => {
      dispatch(summaryActions.nextPage());
      return dispatch(summaryActions.listRequests(flow));
    },
    reloadRequests: flow => {
      dispatch(summaryActions.reset());
      dispatch(summaryActions.listRequests(flow));
    },
    searchRequests: state => {
      dispatch(summaryActions.searchRequests(state));
    },
    onRequestPressed: async request => {
      const { caseMasterId, caseType } = request.item;
      if (caseType === FLOW_INFO.PHONG_HOP || caseType === FLOW_INFO.PHONG_HOP_DX) {
        await Promise.all([
          dispatch(detailActions.getDetailRequest({ caseMasterId })),
          dispatch(summaryActions.listAvailableActions({ caseMasterId })),
          dispatch(summaryActions.getCurrentState({ caseMasterId })),
        ]);
      } else if (caseType === FLOW_INFO.DIEU_XE || caseType === FLOW_INFO.DIEU_XE_DX) {
        await Promise.all([
          dispatch(detailDatXeActions.getDetailRequest({ caseMasterId })),
          dispatch(summaryActions.listAvailableActions({ caseMasterId })),
          dispatch(summaryActions.getCurrentState({ caseMasterId })),
        ]);
      } else if (caseType === FLOW_INFO.LICH_TUAN) {
        await Promise.all([
          dispatch(detailLTActions.getDetailRequest({ caseMasterId })),
          dispatch(summaryActions.listAvailableActions({ caseMasterId })),
          dispatch(summaryActions.getCurrentState({ caseMasterId })),
        ]);
      } else if (caseType === FLOW_INFO.VE_MAY_BAY) {
        await Promise.all([
          dispatch(detailVeMayBayActions.getDetailRequest({ caseMasterId })),
          dispatch(summaryActions.listAvailableActions({ caseMasterId })),
          dispatch(summaryActions.getCurrentState({ caseMasterId })),
        ]);
      }

      return ownProps.onRequestPressed(caseMasterId);
    },
  })
)(Requests);
