/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const initialState = {
  actionHistory: [],
  document: null,
  flowInstance: null,
  // userView nếu chuyển xử lý vb đến cho cá nhân
  // department nếu chuyển xử lý vb đến cho đơn vị
  handlers: {},
  handlerDepts: {},
  groups: null,
  handlersCC: {},
  history: null,
  nextSteps: null,
  process: null,
  step: null,
  isFocusComment: false,
  isViewAsUyQuyen: false,
  pagesNumberOfDoc: null,
  forwardProcess: null,
  vbDocUserBcc: null,
  bccInfo: null,
};

export default createSlice({
  slice: 'detail',
  initialState,
  reducers: {
    addCommentSuccess(state, { payload }) {
      state.actionHistory = [payload.result, ...state.actionHistory];
    },

    getDocumentSuccess(state, { payload }) {
      state.document = payload;
    },
    getOpinionFormSuccess(state, { payload }) {
      state.opinionForm = payload;
    },
    updateViewAsUyQuyen(state, { payload }) {
      state.isViewAsUyQuyen = payload;
    },
    getVbDocUserBccSuccess(state, { payload }) {
      state.vbDocUserBcc = payload;
    },
    getBccInfoSuccess(state, { payload }) {
      state.bccInfo = payload;
    },
    setIsAutoBcc(state, { payload }) {
      state.isAutoBcc = payload;
    },
    setIsAutoBccDuThao(state, { payload }) {
      state.isAutoBccDuThao = payload;
    },
    focusCommentInputSuccess(state) {
      state.isFocusComment = true;
    },
    getProcessSuccess(
      state,
      {
        payload: { flowInstance, process, step },
      }
    ) {
      state.flowInstance = flowInstance;
      state.process = process;
      state.step = step;
    },
    getForwardProcessSuccess(state, { payload }) {
      state.forwardProcess = payload;
    },
    listDepartmentHandlers() {},
    listDepartmentsHandlers() {},
    listUserHandlers() {},
    listUsersHandlers() {},
    listGroupsHandlers() {},
    listGroupsHandlersSuccess(state, { payload }) {
      state.groups = payload;
    },
    listHandlersSuccess(state, { payload }) {
      state.handlers = payload.reduce(
        (hash, userView) => ({
          ...hash,
          [userView.id]: userView,
        }),
        {}
      );
    },
    listHandlersDeptSuccess(state, { payload }) {
      state.handlerDepts = payload.reduce(
        (hash, userView) => ({
          ...hash,
          [userView.id]: userView,
        }),
        {}
      );
    },

    listCCHandlers() {},
    listCCHandlersSuccess(state, { payload }) {
      state.handlersCC = payload.reduce(
        (hash, userView) => ({
          ...hash,
          [userView.id]: userView,
        }),
        {}
      );
    },

    listNextStepsSuccess(state, { payload }) {
      state.nextSteps = payload;
    },

    cancelLoadActionHistory() {},
    loadActionHistory() {},
    loadActionHistorySuccess(state, { payload }) {
      state.actionHistory = payload;
    },

    cancelReLoadActionHistory() {},
    reLoadActionHistory() {},
    reLoadActionHistorySuccess(state, { payload }) {
      state.actionHistory = payload;
    },

    loadDetail() {
      return initialState;
    },

    cancelLoadHistory() {},
    loadHistory() {},
    loadHistorySuccess(state, { payload }) {
      state.history = payload;
    },

    getPagesNummberOfDoc() {},
    getPagesNummberOfDocSuccess(state, { payload }) {
      if (payload.payload !== undefined) {
        if (payload.payload === 'Network Error') {
          state.pagesNumberOfDoc = 2;
        } else {
          state.pagesNumberOfDoc = payload.payload;
        }
      }
    },

    uploadImageBase64Success() {},

    refreshDocument(state) {
      state.document = null;
    },
  },
});
