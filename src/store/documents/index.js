import { combineReducers } from 'redux';

import { logics as detailLogics, reducer as detailReducer } from './detail';
import { logics as listLogics, reducer as listReducer } from './list';
import { logics as notificationLogics, reducer as notificationReducer } from './notification';

export const logics = [...detailLogics, ...listLogics, ...notificationLogics];

export const reducer = combineReducers({
  detail: detailReducer,
  list: listReducer,
  notification: notificationReducer,
});
