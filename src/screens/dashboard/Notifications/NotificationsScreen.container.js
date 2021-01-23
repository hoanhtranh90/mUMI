import { connect } from 'react-redux';
import { selectors, actions as documentActions } from 'eoffice/store/documents/notification';
import { actions as docsActions } from 'eoffice/store/documents/list';
import { actions as adminsActions } from 'eoffice/store/administrative/summary';
import { actions as datXeActions } from "eoffice/store/administrative/datXe/detail";
import { actions as veMayBayActions} from "eoffice/store/administrative/veMayBay/detail";
import NotificationsScreen from './NotificationsScreen';
import {FLOW_INFO} from "../../../constants/administrative";
import {getBookHotelDetail} from "../../../store/administrative/bookHotel/reducer";

const mapStateToProps = state => ({
  notifications: selectors.listNotificationsSelector(state),
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
  setHcFlow: (flowCode) => {
    dispatch(adminsActions.setHcFlow(flowCode))
  },
  markAsRead: (id) => {
    dispatch(documentActions.markAsRead(id))
  },
  getDetailRequest: async (caseMasterId, flowCode) => {
    await dispatch(adminsActions.listAvailableActions({ caseMasterId }))
    await dispatch(adminsActions.getCurrentState({ caseMasterId }))
    if (flowCode === FLOW_INFO.DIEU_XE) {
      await dispatch(datXeActions.reset())
      await dispatch(adminsActions.getFlowInfo(FLOW_INFO.DIEU_XE))
      await dispatch(datXeActions.getDetailRequest({ caseMasterId }))
    } else if (flowCode === FLOW_INFO.VE_MAY_BAY) {
      await dispatch(veMayBayActions.reset())
      await dispatch(adminsActions.getFlowInfo(FLOW_INFO.VE_MAY_BAY))
      await dispatch(veMayBayActions.getDetailRequest({ caseMasterId }))
    } else {

    }
  },
  getBookHotelDetail : (caseMasterId) => {
    dispatch(adminsActions.getFlowInfo(FLOW_INFO.KHACH_SAN))
    dispatch(getBookHotelDetail(caseMasterId))
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
