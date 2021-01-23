import { connect } from 'react-redux';
import { selectors, actions as documentActions } from 'eoffice/store/documents/notification';
import { actions as docsActions } from 'eoffice/store/documents/list';
import { actions as veMayBayActions} from "eoffice/store/administrative/veMayBay/detail";
import { actions as adminsActions } from 'eoffice/store/administrative/summary';
import NotificationsScreen from './NotificationsScreen';
import {actions as chiDaoActions} from "eoffice/store/administrative/theoDoiChiDaoLanhDao";
import {FLOW_INFO} from "../../../../constants/administrative";

const mapStateToProps = state => ({
  notifications: selectors.listNotificationsSelector(state),
  notificationsLoading: selectors.notificationsLoadingSelector(state),
});
const mapDispatchToProps = dispatch => ({
  onDocumentPressed: async docUserView => {
    dispatch(docsActions.viewDetail(docUserView));
  },
  refreshNotifications: () => dispatch(documentActions.resetNotifications()),
  getNotifications: () => {
    dispatch(documentActions.getNotifications());
  },
  viewDocDetail: (docUserView, notify) => {
    if (docUserView !== null) {
      dispatch(docsActions.viewDetail(docUserView));
    }
    if (notify.status === 'unSeen') {
      dispatch(documentActions.markAsRead(notify.notificationDetailId));
    }
  },
  setItem: (item) => {
    dispatch(chiDaoActions.setItemDetail(item))
  },
  markAsRead: (id) => {
    dispatch(documentActions.markAsRead(id))
  },
  getFlowInfo: (flowCode) => {
    dispatch(adminsActions.getFlowInfo(flowCode))
  },

  setHcFlow: (flowCode) => {
    dispatch(adminsActions.setHcFlow(flowCode))
  },

  setDisplay: (display) => {
    dispatch(veMayBayActions.setDisplay(display))
  },

  openDetail: async (caseMasterId, flowCode) => {
    await dispatch(adminsActions.listAvailableActions({ caseMasterId }))
    await dispatch(adminsActions.getCurrentState({ caseMasterId }))
    if (flowCode === FLOW_INFO.VE_MAY_BAY) {
      await dispatch(veMayBayActions.getDetailRequest({ caseMasterId }))
      await dispatch(veMayBayActions.setIsDetail(true))
    } else {

    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
