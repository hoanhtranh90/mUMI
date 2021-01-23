import slice from './slice';
import * as operations from './operations';
import * as selectors from './selectors';
import * as service from './service';

export const { reducer } = slice;

export const actions = {
  ...operations,
  ...slice.actions,
};

export { selectors };
export { service };
