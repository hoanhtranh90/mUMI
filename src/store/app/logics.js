import { createLogic } from 'redux-logic';

import { actions as documentDetailActions } from '../documents/detail';
import { actions as taskDetailActions } from '../tasks/detail';
import slice from './slice';

const { actions } = slice;

const disableLoadingLogic = createLogic({
  type: [documentDetailActions.getDocumentSuccess, taskDetailActions.getTaskSuccess],
  process(_, dispatch, done) {
    dispatch(actions.setLoading(false));
    done();
  },
});

const enableLoadingLogic = createLogic({
  type: [documentDetailActions.loadDetail, taskDetailActions.loadDetail],
  process(_, dispatch, done) {
    dispatch(actions.setLoading(true));
    done();
  },
});

export default [disableLoadingLogic, enableLoadingLogic];
