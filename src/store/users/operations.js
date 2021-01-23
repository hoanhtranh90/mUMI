import createOperation from '../createOperation';
import slice from './slice';
import * as userService from './service';
import { selectors as detailSelectors } from '../documents/detail';

const { actions } = slice;

export const loadUserDeptRoleView = createOperation({
  actions: {
    startAction: actions.loadUserDeptRoleViewStart,
    successAction: actions.loadUserDeptRoleViewSuccess,
    failedAction: actions.loadUserDeptRoleViewFailed,
  },
  process: ({ getState }) => {
    const state = getState();
    const vbProcess = detailSelectors.processSelector(state);
    const step = detailSelectors.stepSelector(state);

    const params = {
      stepId: null,
    };
    if (vbProcess) {
      params.stepId = vbProcess.stepId;
    }
    if (step) {
      params.flowId = step.flowId;
    }

    return userService.loadUserDeptRoleView(params);
  },
});

export const listDepartments = createOperation({
  actions: {
    successAction: actions.listDepartmentsSuccess,
  },
  process: () => userService.listDepartments(),
});
