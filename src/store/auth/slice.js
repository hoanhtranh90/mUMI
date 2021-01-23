import { createSlice } from 'redux-starter-kit';

const initialState = {
  auth: false,
  me: null,
  loadError: null,
  deptRole: null,
  menuConfig: [],
  roleId: '',
  changeDeptRole : false,
  listMenu : [],
  notificationByRole : 0
};

export default createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => ({
      ...state,
      auth: action.payload,
      loginError: null,
    }),
    setLoggedInUser: (state, action) => ({
      ...state,
      me: action.payload.result,
    }),
    setCurrentUserDeptRoleId: (state, action) => ({
      ...state,
      currentUserDeptRoleId: action.payload,
    }),
    setLoadError: (state, action) => ({
      ...state,
      loadError: action.payload.error,
    }),
    setDeptRole: (state, action) => ({
      ...state,
      deptRole: action.payload,
    }),
    toggleChangeDeptRole: (state, action) => ({
      ...state,
      changeDeptRole: !state.changeDeptRole,
    }),
    menuConfig: (state, action) => ({
      ...state,
      menuConfig: action.payload.result,
    }),
    setListMenu: (state, action) => ({
      ...state,
      listMenu: action.payload,
    }),
    roleId: (state, action) => ({
      ...state,
      roleId: action.payload,
    }),
    setLogout: () => initialState,
    setMenuConfig: (state, action) => ({
      ...state,
      menuConfig: action.payload,
    }),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    setChangeLogs: (state, action) => ({
      ...state,
      changeLogs: action.payload,
    }),
    setNotificationByRole: (state, action) => ({
      ...state,
      notificationByRole: action.payload,
    }),
  },
});
