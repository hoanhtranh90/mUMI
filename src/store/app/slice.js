/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

const initialState = {
  loading: false,
};

export default createSlice({
  slice: 'app',
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});
