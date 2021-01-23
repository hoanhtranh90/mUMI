import { Alert } from 'react-native';
import { Toast } from 'native-base';

import { COMMENT_TYPES } from '../../../constants/common';
import { actions as listActions } from '../list';
import createOperation from '../../createOperation';
import * as selector from './selectors';
import * as service from './service';
import slice from './slice';
import NavigationService from 'eoffice/utils/NavigationService';

const { actions } = slice;
const onSuccess = ({ dispatch }) => dispatch(listActions.updateQuery());

export const addComment = createOperation({
  actions: {
    successAction: actions.addCommentSuccess,
  },
  async process({ getState, payload }) {
    const state = getState();
    const task = selector.taskSelector(state);

    const comment = await service.addComment({
      ...payload,
      objectId: task.id,
      objectType: COMMENT_TYPES.TASK,
    });

    return {
      id: comment.id,
      actionName: comment.actionName,
      creatorName: comment.fromUserName,
      creatorId: comment.fromUserId,
      createTime: comment.createTime,
      dataType: 'comment',
      attachments: comment.attachments,
      content: comment.content,
    };
  },
});

// actions
export const findReceiversForTask = createOperation({
  actions: {
    successAction: actions.receiversForTaskSuccess,
  },
  async process() {
    const receiversForTask = await service.findReceiversForTask();
    return receiversForTask;
  },
});

export const findAllAssignersForTask = createOperation({
  actions: {
    successAction: actions.assignersForTaskSuccess,
  },
  async process() {
    const assignersForTask = await service.findAllAssignersForTask();
    return assignersForTask;
  },
});

export const findAllCoordinatorsForTask = createOperation({
  actions: {
    successAction: actions.listCoordinatorsSuccess,
  },
  async process() {
    const listCoordinatorsSuccess = await service.findAllCoordinatorsForTask();
    return listCoordinatorsSuccess;
  },
});

export const approveCompletedTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, score } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
      score,
    };
    await service.approveCompletedTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Phê duyệt hoàn thành công việc thành công',
});


export const createTask = form => async () => {
  await service
    .createTask(form)
    .then(res => {
      Toast.show({
        text: 'Tạo công việc thành công',
        type: 'success',
        duration: 3000,
      });
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const approveTask = createOperation({
  onSuccess,
  process: async ({ getState }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    await service.approveTask({ taskId: task.id });
    NavigationService.goBack();
    return true;
  },
  successMessage: 'Phê duyệt công việc thành công',
  requireConfirm: true,
  confirmTitle: 'Xác nhận phê duyệt công việc',
});

export const cancelTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.cancelTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Huỷ công việc thành công',
});

export const completeTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.completeTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Hoàn thành công việc thành công',
});

export const extendTask = createOperation({
  onSuccess,
  async process({ dispatch, getState, payload: { deadline, note } }) {
    const task = selector.taskSelector(getState());

    const data = {
      deadline,
      comment: note,
    };
    await service.extendTask({ taskId: task.id, data });
    dispatch(
      actions.loadDetail({
        taskId: task.id,
      })
    );
    return true;
  },
  successMessage: 'Gia hạn công việc thành công',
});

export const pauseTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.pauseTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Tạm dừng công việc thành công',
});

export const refuseTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.refuseTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Từ chối đăng ký công việc thành công',
});

export const refuseCompletedTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.refuseCompletedTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Từ chối hoàn thành công việc thành công',
});

export const updateProgress = createOperation({
  onSuccess,
  async process({ dispatch, getState, payload }) {
    const task = selector.taskSelector(getState());
    const data = {
      ...payload,
      taskId: task.id,
    };
    try {
      await service.updateProgress({ data });
      Toast.show({
        text: 'Cập nhật tiến độ công việc thành công',
        type: 'success',
      });
      dispatch(
        actions.loadDetail({
          taskId: task.id,
        })
      );
    } catch (error) {
      Alert.alert('Thông báo', 'Cập nhật tiến độ công việc không thành công', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    }
  },
});
