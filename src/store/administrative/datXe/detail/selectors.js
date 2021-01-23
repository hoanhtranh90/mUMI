import { createSelector } from 'redux-starter-kit';

const requestStateSelector = createSelector(
  ['administrative.datXe.detail'],
  detail => detail
);

export const detailSelector = createSelector(
  [requestStateSelector],
  detail => detail.request
);

export const hcCaseDieuXeSelector = createSelector(
  [detailSelector],
  detail => detail?.hcCaseDieuxe
);

export const currentListCarAndDriverSelector = createSelector(
  [detailSelector],
  detail => detail?.currentListCarAndDriver
);
