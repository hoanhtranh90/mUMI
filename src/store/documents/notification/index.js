import logics from './logics';
import slice from './slice';
import * as selectors from './selectors';

export const { reducer } = slice;

export const actions = {
  ...slice.actions,
};

export { logics, selectors };
