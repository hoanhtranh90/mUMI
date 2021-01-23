// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from 'redux-starter-kit';

const initialState = {
  requests: [],
  query: {
    page: 0,
    size: 10,
    sort: 'updateTime,desc'
  },
  hasMore: true,
  loading: false,
  error: null,
  detail: null,
  listLD: [],
  listChuTriPhoiHop: [],
  listChuTri: [],
  listPhoiHop: [],
  listSector: [],
  hcCaseCommands: null,
  userDeptRole: [],
  donViThucHienDept: null,
  item: null,
  viewDetail: false,
};
export default createSlice({
  slice: 'chidaoLD',
  initialState,
  reducers: {
    reset: state => ({
      ...state,
      requests: [],
      query: initialState.query,
      hasMore: true,
      loading: false,
      viewDetail: false,
    }),
    listStart: state => ({
      ...state,
      loading: true,
    }),
    listSuccess: (state, action) => ({
      ...state,
      loading: false,
      requests: state.query.page === 0 ?
        action.payload.result :
        [...state.requests, ...action.payload.result],
      hasMore: action.payload.result.length === 10,
    }),
    listError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    nextPage: state => ({
      ...state,
      query: {
        ...state.query,
        page : state.query.page + 1
      }
    }),
    refreshPage: state => ({
      ...state,
      requests: [],
      query: {
        page: 0,
        size: 10,
        sort: 'updateTime,desc'
      }
    }),
    getDetailChiDaoSuccess: (state, action) => ({
      ...state,
      detail: action.payload.result,
    }),

    listLDDVSuccess: (state, action) => {
      return {
        ...state,
        listLD: action.payload.result,
      }
    },

    listChuTriPhoiHopSuccess: (state, action) => (
      {
      ...state,
      listChuTriPhoiHop: action.payload.result,
      }
    ),

    findEachChuTriPhoiHopSuccess: (state, action) => (
      {
        ...state,
        listChuTri: action.payload.result.chuTri,
        listPhoiHop: action.payload.result.phoiHop,
      }
    ),

    findAllSectorSuccess: (state, action) => {
     return {
       ...state,
       listSector: action.payload.result
      }
    },

    getHcCaseCommandsSuccess: (state, action) => (
      {
        ...state,
        hcCaseCommands: action.payload.result.hcCaseCommands,
        userDeptRole:
          [action.payload.result.phuTrachCap1UserDeptRole,
          action.payload.result.phuTrachCap2UserDeptRole],
          donViThucHienDept: action.payload.result.donViThucHienDept
      }
    ),

    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    setItem: (state, action) => {
      return {
        ...state,
        item: action.payload,
      }
    },
    setViewDetail: (state, action) => {
      return {
        ...state,
        viewDetail: action.payload
      }
    }
  },
});
