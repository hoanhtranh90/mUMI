import { createSelector } from 'redux-starter-kit';

const summaryStateSelector = createSelector(
  ['administrative.summary'],
  list => list
);

export const requestsSelector = createSelector(
  [summaryStateSelector],
  list => list.requests
);

export const querySelector = createSelector(
  [summaryStateSelector],
  list => list.query
);

export const isLoadingSelector = createSelector(
  [summaryStateSelector],
  list => list.loading
);

export const modeSelector = createSelector(
  [summaryStateSelector],
  list => list.mode
);

export const hasMoreSelector = createSelector(
  [summaryStateSelector],
  list => list.hasMore
);

export const hcFlowSelector = createSelector(
  [summaryStateSelector],
  list => list.hcFlow
);

export const flowIdSelector = createSelector(
  [hcFlowSelector],
  hcFlow => hcFlow?.id
);

export const flowCodeSelector = createSelector(
  [hcFlowSelector],
  hcFlow => hcFlow?.flowCode
);

export const actionsSelector = createSelector(
  [summaryStateSelector],
  list => list.actions?.actions
);

export const currentStateSelector = createSelector(
  [summaryStateSelector],
  list => list.currentState?.currentState
);

export const hcFlowsCanStartSelector = createSelector(
  [summaryStateSelector],
  list => list.hcFlowsCanStart
);

export const hcFlowsAvailableSelector = createSelector(
  [summaryStateSelector],
  list => list.hcFlowsAvailable
);

export const actorsGroupSelector = createSelector(
  [summaryStateSelector],
  list => list.actorsGroup
);
