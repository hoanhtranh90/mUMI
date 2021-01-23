import { createSelector } from 'redux-starter-kit';

const notificationsSelector = createSelector(
  ['documents'],
  documents => documents.notification
);

export const listNotificationsSelector = createSelector(
  [notificationsSelector],
  notifications => notifications.notifications
);

export const paginateSelector = createSelector(
  [notificationsSelector],
  notifications => notifications.paginate
);

export const notificationsLoadingSelector = createSelector(
  [notificationsSelector],
  notifications => notifications.notificationsLoading
);
