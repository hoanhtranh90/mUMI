import { createLogic } from 'redux-logic';
import * as service from './service';
import * as selectors from './selectors';
import slice from './slice';
import utils from '../../../service/utils';
import {Platform} from "react-native";
import DeviceInfo from "react-native-device-info";

const { actions } = slice;

const getNotificationsLogic = createLogic({
  type: actions.getNotifications,
  latest: true,
  processOptions: {
    successType: actions.getNotificationsSuccess,
  },
  process({ getState }) {
    const state = getState();
    const paginate = selectors.paginateSelector(state);
    paginate.os = Platform.OS
    paginate.modelCode = DeviceInfo.getDeviceId()
    return service.listNotifications({ ...paginate });
  },
});

const markAsReadLogic = createLogic({
  type: actions.markAsRead,
  latest: true,
  async process({ action: { payload: id } }) {
    await service.markAsReadNotify(id);
    await actions.markAsRead(id);
    return utils.refreshNotificationUnseen();
  },
});

const deleteNotifyLogic = createLogic({
  type: actions.deleteNotify,
  latest: true,
  async process({ action: { payload: id } }) {
    await service.deleteNotify(id);
    return utils.refreshNotificationUnseen();
  },
});

const markAsReadAllLogic = createLogic({
  type: actions.markAsReadAll,
  latest: true,
  async process() {
    await service.markAsReadAllNotify();
    return utils.refreshNotificationUnseen();
  },
});

const deleteAllLogic = createLogic({
  type: actions.deleteAll,
  latest: true,
  async process() {
    await service.deleteAllNotify();
    return utils.refreshNotificationUnseen();
  },
});

export default [
  getNotificationsLogic,
  markAsReadLogic,
  markAsReadAllLogic,
  deleteAllLogic,
  deleteNotifyLogic,
];
