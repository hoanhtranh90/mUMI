import { createSelector } from 'redux-starter-kit';

import { deptRoleSelector } from '../../auth/selectors';
import { TASK_STATUS } from '../../../constants/tasks';

const detailsSelector = createSelector(
  ['tasks.details'],
  details => details
);

export const taskSelector = createSelector(
  [detailsSelector],
  details => details.task
);

export const attachmentsSelector = createSelector(
  [detailsSelector],
  details => details.attachments
);

export const actionHistorySelector = createSelector(
  [detailsSelector],
  details => details.actionHistory
);

export const coordinatorsSelector = createSelector(
  [detailsSelector],
  details => details.coordinators
);

export const receiversForTaskSelector = createSelector(
  [detailsSelector],
  details => details.receiversForTask
);

export const assignersForTaskSelector = createSelector(
  [detailsSelector],
  details => details.assignersForTask
);

export const relatedDocsSelector = createSelector(
  [detailsSelector],
  details => details.relatedDocs
);

export const subtasksSelector = createSelector(
  [detailsSelector],
  details => details.subtasks
);

const isAssignerSelector = createSelector(
  [taskSelector, deptRoleSelector],
  (task, deptRole) => deptRole?.id === task?.assignerUserDeptRoleId
);
const isReceiverSelector = createSelector(
  [taskSelector, deptRoleSelector],
  (task, deptRole) => deptRole?.id === task?.receiverUserDeptRoleId
);

// check allowed actions
export const canCancelSelector = createSelector(
  [taskSelector, isReceiverSelector],
  (task, isReceiver) => isReceiver && task?.taskStatus === TASK_STATUS.CHO_PHE_DUYET_DK
);

export const canCompleteSelector = createSelector(
  [taskSelector, isReceiverSelector],
  (task, isReceiver) => isReceiver && task?.taskStatus === TASK_STATUS.DANG_THUC_HIEN
);

export const canExtendSelector = createSelector(
  [taskSelector, isAssignerSelector],
  (task, isAssigner) => isAssigner && task?.taskStatus === TASK_STATUS.DANG_THUC_HIEN
);

export const canPauseSelector = createSelector(
  [taskSelector, isAssignerSelector],
  (task, isAssigner) => isAssigner && task?.taskStatus === TASK_STATUS.DANG_THUC_HIEN
);

// phe duyet/tu choi dang ki
export const canProcessApplySelector = createSelector(
  [taskSelector, isAssignerSelector],
  (task, isAssigner) => isAssigner && task?.taskStatus === TASK_STATUS.CHO_PHE_DUYET_DK
);

// phe duyet/dang ki hoan thanh
export const canProcessCompleteSelector = createSelector(
  [taskSelector, isAssignerSelector],
  (task, isAssigner) => isAssigner && task?.taskStatus === TASK_STATUS.HOAN_THANH
);

export const canUpdateProgressSelector = createSelector(
  [taskSelector],
  task => task?.taskStatus === TASK_STATUS.DANG_THUC_HIEN
);
