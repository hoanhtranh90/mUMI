import { createSlice } from 'redux-starter-kit';

const initialState = {
  request: null,
  loading: false,
  error: null,
  calendars: null,
};

export default createSlice({
  slice: 'detail',
  initialState,
  reducers: {
    reset: state => ({
      ...state,
      request: initialState.requests,
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
    detailError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    listRoomCalendarSuccess: (state, action) => ({
      ...state,
      calendars: action.payload.result,
    }),
  },
});
