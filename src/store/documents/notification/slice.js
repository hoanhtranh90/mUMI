/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const initialState = {
  notifications: [],
  paginate: {
    page: 0,
    size: 20,
    sort: 'createTime,desc',
  },
  notificationsLoading: false,
};

export default createSlice({
  slice: 'notifications',
  initialState,
  reducers: {
    getNotifications(state) {
      state.notificationsLoading = true;
    },
    getNotificationsSuccess(state, { payload }) {
      if (state.paginate.page === 0) {
        state.notifications = [...payload];
      } else state.notifications.splice(state.notifications.length, 0, ...payload);
      state.paginate.page += 1;
      state.notificationsLoading = false;
    },
    resetNotifications() {
      return {
        ...initialState,
      };
    },
    refreshNotifications(state) {
      state.paginate.page = 0;
    },
    markAsRead(state, { payload: id }) {
      const index = state.notifications.findIndex(
        notification => notification.notificationDetailId === id
      );
      if (index >= 0) {
        state.notifications[index].status = 'seen';
      }
    },
    markAsReadAll(state) {
      state.notifications.forEach(notification => (notification.status = 'seen'));
    },
    deleteNotify(state, { payload: id }) {
      state.notifications = state.notifications.filter(
        notification => notification.notificationDetailId !== id
      );
    },
    deleteAll() {
      return { ...initialState };
    },
  },
});
