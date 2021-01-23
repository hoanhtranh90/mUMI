import { createLogic } from 'redux-logic';

import { TASK_TYPES } from 'eoffice/constants/tasks';
import { transformQuery } from './utils';

import { actions as detailActions } from '../detail';
import * as selectors from './selectors';
import * as service from './service';
import slice from './slice';

const { actions } = slice;

const listTasksLogic = createLogic({
  type: actions.listTasks,
  cancelType: actions.cancelListTasks,
  latest: true,
  processOptions: {
    failType: actions.listTasksFailed,
    successType: actions.listTasksSuccess,
  },
  process({ getState }) {
    const state = getState();
    const query = selectors.querySelector(state);
    const paginate = selectors.paginateSelector(state);
    const mode = selectors.modeSelector(state);

    const params = {
      ...transformQuery(query),
      ...paginate,
    };

    if (mode === TASK_TYPES.ASSIGNED) {
      return service.listAssignedTasks(params);
    }
    return service.listReceivedTasks(params);
  },
});

const countTasksLogic = createLogic({
  type: actions.countTasks,
  latest: true,
  processOptions: {
    successType: actions.countTasksSuccess,
  },
  process({ getState }) {
    const state = getState();
    const mode = selectors.modeSelector(state);
    const query = selectors.querySelector(state);

    const params = transformQuery(query);
    if (mode === TASK_TYPES.ASSIGNED) {
      return service.countAssignedTasks(params);
    }
    return service.countReceivedTasks(params);
  },
});

const updateQueryLogic = createLogic({
  type: actions.updateQuery,
  process(deps, dispatch, done) {
    dispatch(actions.cancelListTasks());
    dispatch(actions.countTasks());
    dispatch(actions.listTasks());
    done();
  },
});

const changeModeLogic = createLogic({
  type: actions.setMode,
  process: (deps, dispatch, done) => {
    dispatch(actions.resetTasks());
    dispatch(actions.countTasks());
    dispatch(actions.listTasks());
    done();
  },
});

const refreshTasksLogic = createLogic({
  type: actions.refreshTasks,
  process: (deps, dispatch, done) => {
    dispatch(actions.updateQuery());
    done();
  },
});

const viewDetailLogic = createLogic({
  type: actions.viewDetail,
  process(
    {
      action: { payload: task },
    },
    dispatch,
    done
  ) {
    const { id: taskId } = task;
    dispatch(detailActions.loadDetail({ taskId }));
    done();
  },
});

export default [
  refreshTasksLogic,
  listTasksLogic,
  countTasksLogic,
  updateQueryLogic,
  changeModeLogic,
  viewDetailLogic,
];
