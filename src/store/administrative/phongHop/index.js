import { combineReducers } from 'redux';

import { reducer as detailReducer } from './detail';

export const reducer = combineReducers({
  detail: detailReducer,
});
