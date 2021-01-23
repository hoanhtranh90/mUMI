import { createSelector } from 'redux-starter-kit';

const requestStateSelector = createSelector(
  ['administrative.chiDaoLD'],
  list => list
);

export const requestsSelector = createSelector(
  [requestStateSelector],
  list => list.requests
);

export const querySelector = createSelector(
  [requestStateSelector],
  list => list.query
);

export const pageSelector = createSelector(
  [requestStateSelector],
  list => list.page
);

export const detailLDStateSelector = createSelector(
  [requestStateSelector],
  list => list.detail
);

export const detailStateSelector = createSelector(
  [requestStateSelector],
  list => list.detail?.hcCaseCommand
);

export const isLoadingSelector = createSelector(
  [requestStateSelector],
  list => list.loading
);

export const hasMoreSelector = createSelector(
  [requestStateSelector],
  list => list.hasMore
);

export const ldDonViSelector = createSelector(
  [requestStateSelector],
  list => list.listLDDonVi
);

export const dvChutriSelector = createSelector(
  [requestStateSelector],
  list => list.listDVChuTri
);

export const caseMasterIdStateSelector = createSelector(
  [detailLDStateSelector],
  detail => detail?.hcCaseMaster.id
);
