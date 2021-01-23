import { createSlice } from 'redux-starter-kit';

const initialState = {
  departments: [],
  userDeptRoleView: {},
  userDeptRoleViewLoading: false,
  error: null,
};

export default createSlice({
  slice: 'users',
  initialState,
  reducers: {
    listDepartmentsSuccess: (state, action) => ({
      ...state,
      departments: action.payload.result,
    }),
    loadUserDeptRoleViewStart: state => ({
      ...state,
      userDeptRoleViewLoading: true,
    }),
    loadUserDeptRoleViewSuccess: (state, action) => ({
      ...state,
      userDeptRoleView: action.payload.result.reduce(
        (hash, userView) => ({
          ...hash,
          [userView.id]: userView,
        }),
        {}
      ),
      userDeptRoleViewLoading: false,
    }),
    loadUserDeptRoleViewFailed: (state, action) => ({
      ...state,
      error: action.payload.error,
      userDeptRoleViewLoading: false,
    }),
  },
});
