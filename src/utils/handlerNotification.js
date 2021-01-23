import store from '../store';
import { Alert } from 'react-native';
import { VB_NOTIFICATION } from '../constants/constants';
import { actions as notiActions } from 'eoffice/store/documents/notification';
import { actions as docsActions } from 'eoffice/store/documents/list';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import {
  getProcessIdVbIncomingDoc,
  getProcessIdVbOutgoingDoc,
} from '../store/documents/notification/service';
import { DOCUMENT_TYPE } from '../constants/documents';
import NavigationService from './NavigationService';
import { actions as authActions } from 'eoffice/store/auth';
import { actions as commandsActions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import { actions as adminsActions } from 'eoffice/store/administrative/summary';
import {
  CHI_DAO_MESSAGE_TYPE,
  FLOW_INFO,
  MESSAGE_TYPE_DIEU_XE,
  MESSAGE_TYPE_KHACH_SAN,
  MESSAGE_TYPE_MAY_BAY,
} from '../constants/administrative';
import { getHcCommandSearchViewByID } from '../store/administrative/theoDoiChiDaoLanhDao/service';
import DeviceInfo from 'react-native-device-info';
import { actions as datXeActions } from '../store/administrative/datXe/detail';
import { actions as veMayBayActions } from '../store/administrative/veMayBay/detail';
import { getDetailVeMayBay } from '../store/administrative/veMayBay/detail/service';
import { getBookHotelDetail } from '../store/administrative/bookHotel/reducer';

export default async notification => {
  const data = JSON.parse(notification.data);
  const receiver = JSON.parse(notification.receiver);
  const vbNotificationDetail = JSON.parse(notification.vbNotificationDetail);
  vbNotificationDetail && store.dispatch(notiActions.markAsRead(vbNotificationDetail.id));
  switch (notification.messageType) {
    case VB_NOTIFICATION.MESSAGE_TYPE.INCOMING_CXL:
    case 'incomingDoc':
    case 'chuyenTiepLanhDao':
    case VB_NOTIFICATION.MESSAGE_TYPE.INCOMING_BANHANH:
    case VB_NOTIFICATION.MESSAGE_TYPE.INCOMING_COMMENT:
    case VB_NOTIFICATION.MESSAGE_TYPE.INCOMING_TUCHOI:
      await routingIncomingDoc(data, receiver);
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_CANHBAOQUAHAN:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_CAPNHAT_TIENDO:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_CHANGE_DEADLINE:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_DANGKY:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_GIAOVIEC:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_HOANTHANH:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_HUY:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_PHEDUYET:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_PHEDUYET_HOANTHANH:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_TAMDUNG:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_TUCHOI:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.CV_TUCHOI_HOANTHANH:
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_COMMENT:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_BANHANH:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_CC:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_CXL:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_KETTHUC:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_TUCHOI:
    case VB_NOTIFICATION.MESSAGE_TYPE.OUTGOING_TUCHOIBANHANH:
    case 'outgoingDoc':
      await routingOutgoingDoc(data, receiver);
      return;
    case VB_NOTIFICATION.MESSAGE_TYPE.RANKING_INSERTRANKINGSCORE:
      return;
    case CHI_DAO_MESSAGE_TYPE.CREATE:
    case CHI_DAO_MESSAGE_TYPE.UPDATE:
    case CHI_DAO_MESSAGE_TYPE.DK_DEADLINE:
    case CHI_DAO_MESSAGE_TYPE.GIA_HAN:
    case CHI_DAO_MESSAGE_TYPE.HUY:
    case CHI_DAO_MESSAGE_TYPE.YCBS:
    case CHI_DAO_MESSAGE_TYPE.PHE_DUYET:
    case CHI_DAO_MESSAGE_TYPE.BAO_CAO:
    case CHI_DAO_MESSAGE_TYPE.CHO_Y_KIEN:
      await routingToCommands(data, receiver);
      return;
    case MESSAGE_TYPE_DIEU_XE.CAP_NHAT:
    case MESSAGE_TYPE_DIEU_XE.DANG_KY:
    case MESSAGE_TYPE_DIEU_XE.PHE_DUYET:
    case MESSAGE_TYPE_DIEU_XE.HUY_YEU_CAU:
    case MESSAGE_TYPE_DIEU_XE.TU_CHOI:
      await routingToDieuXe(data, receiver);
      return;
    case MESSAGE_TYPE_MAY_BAY.CAP_NHAT:
    case MESSAGE_TYPE_MAY_BAY.DANG_KY:
    case MESSAGE_TYPE_MAY_BAY.PHE_DUYET:
    case MESSAGE_TYPE_MAY_BAY.HUY_YEU_CAU:
    case MESSAGE_TYPE_MAY_BAY.TU_CHOI:
      await routingToMayBay(data, receiver);
      return;
    case MESSAGE_TYPE_KHACH_SAN.CAP_NHAT:
    case MESSAGE_TYPE_KHACH_SAN.DANG_KY:
    case MESSAGE_TYPE_KHACH_SAN.PHE_DUYET:
    case MESSAGE_TYPE_KHACH_SAN.HUY_YEU_CAU:
    case MESSAGE_TYPE_KHACH_SAN.TU_CHOI:
      await routingToKhachSan(data, receiver);
      return;
    default:
      return;
  }
};

const routingToDieuXe = async (data, receiver) => {
  await changeUserDeptRole(receiver);
  const caseMasterId = data.hcCaseMasterId || data.caseMasterId;
  if (caseMasterId) {
    await setHcFlow({ flowCode: FLOW_INFO.DIEU_XE });
    await store.dispatch(adminsActions.listAvailableActions({ caseMasterId }));
    await store.dispatch(adminsActions.getCurrentState({ caseMasterId }));
    await store.dispatch(datXeActions.reset());
    await store.dispatch(datXeActions.getDetailRequest({ caseMasterId }));
    NavigationService.navigate('DetailDatXe', { caseMasterId });
  }
};

const routingToKhachSan = async (data, receiver) => {
  await changeUserDeptRole(receiver);
  const caseMasterId = data.hcCaseMasterId || data.caseMasterId;
  if (caseMasterId) {
    await setHcFlow({ flowCode: FLOW_INFO.DIEU_XE });
    await store.dispatch(getBookHotelDetail(caseMasterId));
  }
};

const routingToMayBay = async (data, receiver) => {
  await changeUserDeptRole(receiver);
  const caseMasterId = data.hcCaseMasterId || data.caseMasterId;
  if (caseMasterId) {
    const item = await getDetailVeMayBay({ caseMasterId });
    const display = {
      state: item.hcCaseMaster.state,
      status: item.hcCaseMaster.status,
    };
    if (DeviceInfo.isTablet()) {
      await store.dispatch(adminsActions.setHcFlow(FLOW_INFO.VE_MAY_BAY));
      await store.dispatch(adminsActions.getFlowInfo(FLOW_INFO.VE_MAY_BAY));
      await store.dispatch(adminsActions.listAvailableActions({ caseMasterId }));
      await store.dispatch(adminsActions.getCurrentState({ caseMasterId }));
      await store.dispatch(veMayBayActions.getDetailRequest({ caseMasterId }));
      await store.dispatch(veMayBayActions.setDisplay(display));
      await store.dispatch(veMayBayActions.setIsDetail(true));
      await NavigationService.navigate('MayBayScreenTablet');
    } else {
      await setHcFlow({ flowCode: FLOW_INFO.VE_MAY_BAY });
      await store.dispatch(adminsActions.listAvailableActions({ caseMasterId }));
      await store.dispatch(adminsActions.getCurrentState({ caseMasterId }));
      await store.dispatch(veMayBayActions.reset());
      await store.dispatch(veMayBayActions.getDetailRequest({ caseMasterId }));
      NavigationService.navigate('DetailVeMayBay', { caseMasterId, display });
    }
  }
};

const routingToCommands = async (data, receiver) => {
  await changeUserDeptRole(receiver);
  const item = await getHcCommandSearchViewByID(data.hcCaseCommandsId);
  if (item) {
    if (DeviceInfo.isTablet()) {
      await setItemDetail({ item });
      await setViewDetail(true);
      NavigationService.navigate('ChiDaoScreenTablet');
    } else {
      await setHcFlow({ flowCode: FLOW_INFO.THEO_DOI_CHI_DAO_LANH_DAO });
      await setItemDetail({ item });
      NavigationService.navigate('DetailTabs');
    }
  }
};

const setItemDetail = async item => {
  if (item) {
    await store.dispatch(commandsActions.setItemDetail(item));
  }
};

const setViewDetail = async isView => {
  await store.dispatch(commandsActions.setViewDetail(isView));
};

const setHcFlow = async flowCode => {
  if (flowCode) {
    await store.dispatch(adminsActions.setHcFlow(flowCode));
  }
};

const routingIncomingDoc = async (data, receiver) => {
  await changeUserDeptRole(receiver);
  const vbIncomingDoc = data.vbIncomingDoc;
  getProcessIdVbIncomingDoc(vbIncomingDoc.id).then(res => {
    if (res.data && res.data.length > 0) {
      const docUserView = res.data[0];
      store.dispatch(docsActions.viewDetail(docUserView));
      DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
      NavigationService.navigate('Details', {
        documentId: vbIncomingDoc.id,
      });
    } else Alert.alert('Thông báo', 'Văn bản không có sẵn !');
  });
};

const routingOutgoingDoc = async (data, receiver) => {
  const vbOutgoingDoc = data.vbOutgoingDoc;
  await changeUserDeptRole(receiver);

  getProcessIdVbOutgoingDoc(vbOutgoingDoc.id).then(res => {
    if (res.data && res.data.length > 0) {
      const docUserView = res.data[0];
      store.dispatch(docsActions.viewDetail(docUserView));
      DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
      if (DeviceInfo.isTablet())
        NavigationService.navigate('Details', {
          documentId: vbOutgoingDoc.id,
        });
      else
        NavigationService.navigate('DetailOutDocs', {
          documentId: vbOutgoingDoc.id,
        });
    } else Alert.alert('Thông báo', 'Văn bản không có sẵn !');
  });
};

const changeUserDeptRole = async receiver => {
  if (receiver) {
    const listDeptRoles = store.getState().auth.me.deptRoles;
    const deptRoleSelect = listDeptRoles.find(deptRole => checkActor(deptRole, receiver));
    deptRoleSelect && (await store.dispatch(authActions.changeDeptRole(deptRoleSelect)));
  }
};

const checkActor = (actor1, actor2) => {
  return (
    actor1.roleId === actor2.roleId &&
    actor1.deptId === actor2.deptId &&
    actor1.userId === actor2.userId
  );
};
