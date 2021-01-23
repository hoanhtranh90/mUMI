/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const initialState = {
  error: null,
  actionHistory: [],
  attachments: [],
  coordinators: [],
  relatedDocs: [],
  subtasks: [],
  task: null,
  receiversForTask : [],
  assignersForTask : [],
};

export default createSlice({
  slice: 'tasks',
  initialState,
  reducers: {
    addCommentSuccess(state, { payload }) {
      state.actionHistory = [payload.result, ...state.actionHistory];
    },

    getTask() {},
    getTaskSuccess(state, { payload }) {
      state.task = payload;
    },

    getTaskFailed(state, { payload }) {
      state.error = payload;
    },

    listAttachments() {},
    listAttachmentsSuccess(state, { payload }) {
      state.attachments = payload;
    },

    listCoordinators() {},
    listCoordinatorsSuccess(state, { payload }) {
      state.coordinators = payload.result;
    },

    listRelatedDocs() {},
    listRelatedDocsSuccess(state, { payload }) {
      state.relatedDocs = payload;
    },

    listSubtasks() {},
    listSubtasksSuccess(state, { payload }) {
      state.subtasks = payload;
    },
    receiversForTaskSuccess(state, { payload }) {
      state.receiversForTask = payload.result;
    },
    assignersForTaskSuccess(state, { payload }) {
      state.assignersForTask = payload.result;
    },
    cancelloadActionHistory() {},
    loadActionHistory() {},
    loadActionHistorySuccess(state, { payload }) {
      state.actionHistory = payload;
    },

    loadDetail() {
      return initialState;
    },
  },
});
