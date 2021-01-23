import { createSelector } from 'redux-starter-kit';

const requestStateSelector = createSelector(
  ['administrative.phongHop.detail'],
  detail => detail
);

export const detailSelector = createSelector(
  [requestStateSelector],
  detail => detail.request
);

export const detailPHSelector = createSelector(
  [detailSelector],
  detail => detail?.hcCasePhonghop
);

export const selectedPHSelector = createSelector(
  [detailSelector],
  detail => detail?.selectedRoom
);
