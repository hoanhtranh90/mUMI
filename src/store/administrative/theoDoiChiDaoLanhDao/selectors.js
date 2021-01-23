/* eslint-disable import/no-extraneous-dependencies */
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
  list => list.query.page
);

export const detailLDStateSelector = createSelector(
  [requestStateSelector],
  list => list.detail
);

export const detailStateSelector = createSelector(
  [requestStateSelector],
  list => list.detail?.hcCaseCommand
);

export const UserLDDVSelector = createSelector(
  [requestStateSelector],
  list => list.detail?.listUserLDDV
);

export const UserCVDVSelector = createSelector(
  [requestStateSelector],
  list => list.detail?.listUserCVDV
);

export const isLoadingSelector = createSelector(
  [requestStateSelector],
  list => list.loading
);

export const hasMoreSelector = createSelector(
  [requestStateSelector],
  list => list.hasMore
);

export const lanhDaoSelector = createSelector(
  [requestStateSelector],
  list => list.listLD
);

export const listChuTriPhoiHopSelector = createSelector(
  [requestStateSelector],
  list => list.listChuTriPhoiHop
);

export const listChuTriSelector = createSelector(
    [requestStateSelector],
    list => list.listChuTri
);

export const listPhoiHopSelector = createSelector(
    [requestStateSelector],
    list => list.listPhoiHop
);
export const listSectorSelector = createSelector(
    [requestStateSelector],
    list => list.listSector,
);
export const hcCaseCommandsSelector = createSelector(
    [requestStateSelector],
    list => list.hcCaseCommands
);
export const userDeptRoleSelector = createSelector(
    [requestStateSelector],
    list => list.userDeptRole
);
export const donViThucHienDeptSelector = createSelector(
    [requestStateSelector],
    list => list.donViThucHienDept
);
export const itemDetailSelector = createSelector(
  [requestStateSelector],
  list => list.item
);

export const viewDetailSelector = createSelector(
  [requestStateSelector],
  list => list.viewDetail
);

export const caseMasterIdStateSelector = createSelector(
  [detailLDStateSelector],
  detail => detail?.hcCaseMaster.id
);
