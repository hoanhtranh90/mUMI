/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';

const initialState = {
  documents: [],
  paginate: {
    page: 0,
    size: 10,
    sort: 'sendTime,desc',
  },
  countTTrinh: {},
  query: {},
  total: 0,
  totalCT: 0,
  totalNDB: 0,
  totalPH: 0,
  documentsLoading: false,
  mode: DOCUMENT_TYPE.VB_DEN,
  priorities: [],
  categories: [],
  summary: {},
  unreadReleased: 0,
};

export default createSlice({
  slice: 'list',
  initialState,
  reducers: {
    countDocuments() {},
    countDocumentsSuccess(
      state,
      {
        payload: { total, totalCT, totalNDB, totalPH, unreadReleased },
      }
    ) {
      state.total = total;
      state.totalNDB = totalNDB;
      state.totalPH = totalPH;
      state.unreadReleased = unreadReleased;
    },

    getCountTTrinh() {},
    getCountTTrinhSuccess(state, { payload }) {
      if (payload && payload.length) {
        state.countTTrinh = payload.reduce((hash, item) => ({ ...hash, ...item }), {});
      }
    },

    getSummary() {},
    getSummarySuccess(state, { payload }) {
      state.summary = payload;
      state.totalCT = payload.totalCT[0];
      state.totalNDB = payload.totalNDB[0];
      state.totalPH = payload.totalPH[0];
    },

    cancelListDocuments() {},
    listDocuments(state) {
      state.documentsLoading = true;
    },
    listDocumentsSuccess(state, { payload }) {
      state.documents.splice(state.documents.length, 0, ...payload);
      state.paginate.page += 1;
      state.documentsLoading = false;
    },
    listDocumentsFailed(state) {
      state.documentsLoading = false;
    },
    refreshDocuments(state) {
      state.documents = [];
      state.paginate.page = 0;
    },

    listPriorities() {},
    listPrioritiesSuccess(state, { payload }) {
      state.priorities = payload;
    },

    listCategories() {},
    listCategoriesSuccess(state, { payload }) {
      state.categories = payload;
    },

    markAsRead(state, { payload: key }) {
      const index = state.documents.findIndex(doc => doc.key === key);
      if (index >= 0) {
        state.documents[index].isSeen = true;
      }
    },
    resetDocuments(state) {
      return {
        ...initialState,
        mode: state.mode,
        summary: state.summary,
      };
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    updateQuery(state, { payload }) {
      if (payload?.sort) {
        const { sort, ...query } = payload;

        return {
          ...state,
          documents: [],
          total: 0,
          totalCT: 0,
          totalNDB: 0,
          totalPH: 0,
          paginate: {
            ...initialState.paginate,
            sort: `${sort},desc`,
          },
          query: {
            ...state.query,
            ...query,
          },
          unreadReleased: 0,
        };
      }
      return {
        ...state,
        documents: [],
        total: 0,
        totalCT: 0,
        totalNDB: 0,
        totalPH: 0,
        paginate: {
          ...state.paginate,
          page: 0,
        },
        query: {
          ...state.query,
          ...payload,
        },
        unreadReleased: 0,
      };
    },
    viewDetail() {},
  },
});
