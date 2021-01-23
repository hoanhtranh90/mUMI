import { createSelector } from 'redux-starter-kit';

const taskListSelector = createSelector(
  ['tasks.list'],
  list => list
);

export const tasksSelector = createSelector(
  [taskListSelector],
  list => list.tasks
);

export const totalSelector = createSelector(
  [taskListSelector],
  list => list.total
);

export const paginateSelector = createSelector(
  [taskListSelector],
  list => list.paginate
);

export const querySelector = createSelector(
  [taskListSelector],
  list => list.query
);

export const isLoadingSelector = createSelector(
  [taskListSelector],
  list => list.loading
);

export const modeSelector = createSelector(
  [taskListSelector],
  list => list.mode
);
