import { createSelector } from 'redux-starter-kit';

const requestStateSelector = createSelector(
  ['administrative.veMayBay.detail'],
  detail => detail
);

export const detailSelector = createSelector(
  [requestStateSelector],
  detail => detail.data?.request
);

export const positionsSelector = createSelector(
  [requestStateSelector],
  detail => detail
);

export const detailNewSelector = createSelector(
  [requestStateSelector],
  detail => detail.request
);

export const hcCaseFlightSelector = createSelector(
  [requestStateSelector],
  detail => detail?.request?.hcCaseFlight
);

export const hcCaseFileTicketsSelector = createSelector(
  [requestStateSelector],
  detail => detail?.request?.hcCaseFileTickets
);

export const hcCaseFlightFilesSelector = createSelector(
  [requestStateSelector],
  detail => detail?.request?.hcCaseFlightFiles
);

export const hcCaseFlightUsersSelector = createSelector(
  [requestStateSelector],
  detail => detail?.request?.hcCaseFlightUsers
);

export const hcCaseFlightRouteUserSelector = createSelector(
  [requestStateSelector],
  detail => detail?.request?.hcCaseFlightRouteUser
);

export const isCreateSelector = createSelector(
  [requestStateSelector],
  detail => detail?.isCreate
);

export const isDetailSelector = createSelector(
  [requestStateSelector],
  detail => detail?.isDetail
);

export const searchKeySelector = createSelector(
  [requestStateSelector],
  detail => detail?.searchKey
);
export const displaySelector = createSelector(
  [requestStateSelector],
  detail => detail?.display
);
export const reloadDataSelector = createSelector(
  [requestStateSelector],
  detail => detail?.reloadData
);

export const hcCaseDieuXeSelector = createSelector(
  [detailSelector],
  detail => detail?.hcCaseDieuxe
);

export const currentListCarAndDriverSelector = createSelector(
  [detailSelector],
  detail => detail?.currentListCarAndDriver
);
