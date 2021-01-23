import { createSelector } from 'redux-starter-kit';

const requestStateSelector = createSelector(
  ['administrative.lichTuan.detail'],
  detail => detail
);

export const detailSelector = createSelector(
  [requestStateSelector],
  detail => detail.request
);

export const attachmentsSelector = createSelector(
  [requestStateSelector],
  detail => detail.request?.attachments
);

export const detailLTSelector = createSelector(
  [detailSelector],
  detail => detail?.hcCaseCalendar
);

export const detailLTLanhDao = createSelector(
  [detailSelector],
  detail => detail?.hcCaseCalendarUsers
);

export const detailDVPHSelector = createSelector(
  [detailSelector],
  detail => detail?.hcCoopDepts
);

export const selectedLTSelector = createSelector(
  [detailSelector],
  detail => detail?.selectedRoom
);

export const listcalendarRoomDetailSelector = createSelector(
  [requestStateSelector],
  detail => detail.calendars
);
