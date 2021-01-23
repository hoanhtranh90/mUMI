import { createSlice } from 'redux-starter-kit';

const initialState = {
  request: null,
  positionsUser: null,
  loading: false,
  error: null,
  isCreate: false,
  isDetail: false,
  searchKey: '',
  display: {},
  reloadData: 0
};

export default createSlice({
  slice: 'detail',
  initialState,
  reducers: {
    reset: state => ({
      ...state,
      request: initialState.request,
    }),
    detailStart: state => ({
      ...state,
      loading: true,
    }),
    detailSuccess: (state, action) => ({
      ...state,
      loading: false,
      request: action.payload.result,
    }),

    positionsSuccess: (state, action) => ({
      positionsUser: action.payload.result,
    }),
    detailError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    setIsCreate: (state, action) => ({
      ...state,
      isCreate: action.payload,
    }),
    setIsDetail: (state, action) => ({
      ...state,
      isDetail: action.payload,
    }),
    setSearchKey: (state, action) => ({
      ...state,
      searchKey: action.payload,
    }),
    setDisplay: (state, action) => ({
      ...state,
      display: action.payload,
    }),
    setReloadData: (state, action) => ({
      ...state,
      reloadData: state.reloadData + 1,
    }),
  },
});
