import { combineReducers } from 'redux';

import { logics as listLogics, reducer as listReducer } from './list';
import { logics as detailsLogics, reducer as detailReducer } from './detail';

export const logics = [...listLogics, ...detailsLogics];

export const reducer = combineReducers({
  details: detailReducer,
  list: listReducer,
});
