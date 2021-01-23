import { createSelector } from 'redux-starter-kit';

const appSelector = createSelector(
  ['app'],
  app => app
);

const networkSelector = createSelector(
  ['network'],
  network => network
);

export const isOnlineSelector = createSelector(
  [networkSelector],
  network => network.isConnected
);

export const loadingSelector = createSelector(
  [appSelector],
  app => app.loading
);
