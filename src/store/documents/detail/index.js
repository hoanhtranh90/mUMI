import logics from './logics';
import * as operations from './operations';
import * as selectors from './selectors';
import slice from './slice';

export const { reducer } = slice;

export const actions = {
  ...slice.actions,
  ...operations,
};

export { logics, selectors };
