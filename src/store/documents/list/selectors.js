import { createSelector } from 'redux-starter-kit';

const listSelector = createSelector(
  ['documents'],
  documents => documents.list
);

export const documentsSelector = createSelector(
  [listSelector],
  list => list.documents
);

export const prioritiesSelector = createSelector(
  [listSelector],
  list => list.priorities
);

export const categoriesSelector = createSelector(
  [listSelector],
  list => list.categories
);

export const isLoadingSelector = createSelector(
  [listSelector],
  list => list.documentsLoading
);

export const modeSelector = createSelector(
  [listSelector],
  list => list.mode
);

export const paginateSelector = createSelector(
  [listSelector],
  list => list.paginate
);

export const querySelector = createSelector(
  [listSelector],
  list => list.query
);

export const summarySelector = createSelector(
  [listSelector],
  list => list.summary
);

export const totalSelector = createSelector(
  [listSelector],
  list => list.total
);

export const totalCTSelector = createSelector(
  [listSelector],
  list => list.totalCT
);

export const totalNDBSelector = createSelector(
  [listSelector],
  list => list.totalNDB
);

export const totalPHSelector = createSelector(
  [listSelector],
  list => list.totalPH
);

export const unreadReleasedSelector = createSelector(
  [listSelector],
  list => list.unreadReleased
);

export const countToTrinhSelector = createSelector(
  [listSelector],
  list => list.countTTrinh
);
