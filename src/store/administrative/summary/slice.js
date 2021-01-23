import { createSlice } from 'redux-starter-kit';
import { ADMINISTRATIVE_TYPE } from 'eoffice/constants/administrative';

const initialState = {
  mode: ADMINISTRATIVE_TYPE.PENDING,
  requests: [],
  actorsGroup: [],
  query: {
    flowCode: '',
    key: null,
    startTime: null,
    endTime: null,
    page: 0,
    size: 10,
    sort: 'createTime,desc',
  },
  hasMore: true,
  loading: false,
  error: null,
  hcFlow: null,

  actions: [],
  currentState: null,
  hcFlowsCanStart: null,
  hcFlowsAvailable: null,
};

export default createSlice({
  slice: 'summary',
  initialState,
  reducers: {
    reset: state => ({
      ...state,
      requests: initialState.requests,
      query: initialState.query,
      hasMore: true,
      loading: false,
    }),
    listStart: state => ({
      ...state,
      loading: true,
    }),
    listSuccess: (state, action) => ({
      ...state,
      loading: false,
      requests: [...state.requests, ...action.payload.result],
      hasMore: action.payload.result.length > 0,
    }),
    listCalendarSuccess: (state, action) => ({
      ...state,
      loading: false,
      requests: action.payload.result,
      hasMore: action.payload.result.length > 0,
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
        page: state.query.page + 1,
      },
    }),
    setMode: (state, action) => ({
      ...state,
      mode: action.payload,
    }),
    setHasMore: (state, action) => ({
      ...state,
      hasMore: action.payload,
    }),
    setHcFlow: (state, action) => ({
      ...state,
      hcFlow: action.payload,
    }),
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    setActorsGroup: (state, action) => ({
      ...state,
      actorsGroup: action.payload.actorsGroup,
    }),

    getHcFlowSuccess: (state, action) => ({
      ...state,
      hcFlow: action.payload.result
        ? action.payload.result
        : {
            flowCode: action.payload.params,
          },
    }),

    listActionsSuccess: (state, action) => ({
      ...state,
      actions: action.payload.result,
    }),

    getCurrentStateSuccess: (state, action) => ({
      ...state,
      currentState: action.payload.result,
    }),

    getHcFlowsCanStart: (state, action) => ({
      ...state,
      hcFlowsCanStart: action.payload.result,
    }),

    getHcFlowsAvailable: (state, action) => ({
      ...state,
      hcFlowsAvailable: action.payload.result,
    }),
  },
});
