/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { TASK_TYPES } from 'eoffice/constants/tasks';

const initialState = {
  tasks: [],
  paginate: {
    page: 0,
    size: 10,
    sort: 'updateTime,desc',
  },
  query: {},
  total: 0,
  loading: false,
  mode: TASK_TYPES.RECEIVED,
};

export default createSlice({
  slice: 'tasks',
  initialState,
  reducers: {
    countTasks() {},
    countTasksSuccess(state, { payload }) {
      state.total = payload;
    },

    cancelListTasks() {},
    listTasks(state) {
      state.loading = true;
    },

    listTasksSuccess(state, { payload }) {
      state.tasks.splice(state.tasks.length, 0, ...payload);
      state.paginate.page += 1;
      state.loading = false;
    },

    listTasksFailed(state) {
      state.loading = false;
    },

    refreshTasks(state) {
      state.tasks = [];
      state.paginate.page = 0;
    },

    resetTasks(state) {
      return {
        ...initialState,
        mode: state.mode,
        query: state.query,
      };
    },

    setMode(state, action) {
      state.mode = action.payload;
    },

    updateQuery(state, { payload }) {
      return {
        ...state,
        tasks: [],
        total: 0,
        paginate: initialState.paginate,
        query: {
          ...state.query,
          ...payload,
        },
      };
    },
    viewDetail() {},
  },
});
