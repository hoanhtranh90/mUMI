import { createLogic } from 'redux-logic';

import * as selectors from './selectors';
import * as service from './service';
import slice from './slice';

import { TASK_TYPES } from '../../../constants/tasks';
import { deptRoleSelector } from '../../auth/selectors';
import { convertCommentToHistory } from '../../../utils/utils';
import { convertActionLogToHistory } from './utils';

const { actions } = slice;

const TASK_PROCESS_XULYCHINH = 1;

const loadDetailsLogic = createLogic({
  type: actions.loadDetail,
  latest: true,
  processOptions: {
    successType: actions.getTaskSuccess,
  },
  async process({
    action: {
      payload: { taskId },
    },
  }) {
    const task = await service.getTask({ taskId });
    return task;
  },
});

const listAttachmentsLogic = createLogic({
  type: actions.listAttachments,
  processOptions: {
    successType: actions.listAttachmentsSuccess,
  },
  async process({ getState }) {
    const task = selectors.taskSelector(getState());
    const listAttachments = await service.listAttachments({ taskId: task.id });

    return listAttachments;
  },
});

const listCoordinatorsLogic = createLogic({
  type: actions.listCoordinators,
  processOptions: {
    successType: actions.listCoordinatorsSuccess,
  },
  async process({ getState }) {
    const task = selectors.taskSelector(getState());

    const coordinators = await service.listCoordinators({ taskId: task.id });
    const listCoordinators = coordinators.filter(
      coordinator => coordinator.processType !== TASK_PROCESS_XULYCHINH
    );

    return listCoordinators;
  },
});

const listRelatedDocsLogic = createLogic({
  type: actions.listRelatedDocs,
  processOptions: {
    successType: actions.listRelatedDocsSuccess,
  },
  async process({ getState }) {
    const task = selectors.taskSelector(getState());
    const listRelatedDocs = await service.listRelatedDocs({ taskId: task.id });

    return listRelatedDocs;
  },
});

const listSubtasksLogic = createLogic({
  type: actions.listSubtasks,
  processOptions: {
    successType: actions.listSubtasksSuccess,
  },
  async process({ getState }) {
    const state = getState();
    const task = selectors.taskSelector(state);
    const deptRole = deptRoleSelector(state);
    const subtasks = await service.listSubtasks({ taskId: task.id });

    const listSubtasks = subtasks
      .map(subtask => {
        const isAssigner = subtask.assignerUserDeptRoleId === deptRole.id;
        const isReceiver = subtask.receiverUserDeptRoleId === deptRole.id;

        let type;
        if (isAssigner) {
          type = TASK_TYPES.ASSIGNED;
        } else if (isReceiver) {
          type = TASK_TYPES.RECEIVED;
        }

        return {
          ...subtask,
          type,
        };
      })
      .filter(subtask => !!subtask.type);

    return listSubtasks;
  },
});

const loadActionHistoryLogic = createLogic({
  type: actions.loadActionHistory,
  processOptions: {
    successType: actions.loadActionHistorySuccess,
  },
  process: async ({ getState }) => {
    const task = selectors.taskSelector(getState());

    const [actionLogs, comments] = await Promise.all([
      service.listActionLogs(task.id),
      service.listComments(task.id),
    ]);

    const convertedLogs = actionLogs.map(convertActionLogToHistory);

    const convertedComments = comments.map(convertCommentToHistory);

    const items = [...convertedLogs, ...convertedComments];
    items.sort((item1, item2) => {
      if (item1.createTime > item2.createTime) {
        return -1;
      }
      return item1.createTime < item2.createTime ? 1 : 0;
    });

    return items;
  },
});

export default [
  loadDetailsLogic,
  listAttachmentsLogic,
  listCoordinatorsLogic,
  listRelatedDocsLogic,
  listSubtasksLogic,
  loadActionHistoryLogic,
];
