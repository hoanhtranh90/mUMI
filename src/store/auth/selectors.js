import { createSelector } from 'redux-starter-kit';

const authSelector = createSelector(
  ['auth'],
  auth => auth
);

export const meSelector = createSelector(
  [authSelector],
  auth => auth.me
);

export const deptRolesSelector = createSelector(
  [meSelector],
  me => me?.deptRoles
);

export const deptRoleSelector = createSelector(
  [authSelector],
  auth => auth.deptRole
);

export const changeDeptRoleSelector = createSelector(
  [authSelector],
  auth => auth.changeDeptRole
);

export const menuConfigSelector = createSelector(
  [authSelector],
  auth => auth.menuConfig
);

export const getMenuHanhChinh = createSelector(
  [authSelector],
  auth => auth.menuConfig
);

export const getListMenu = createSelector(
  [authSelector],
  auth => auth.listMenu
);

export const getRoleId = createSelector(
  [authSelector],
  auth => auth.roleId
);

export const getUser = createSelector(
  [authSelector],
  auth => auth.user
);

export const getChangeLogs = createSelector(
  [authSelector],
  auth => auth.changeLogs
);

export const currentUserDeptRoleId = createSelector(
  [authSelector],
  auth => auth.currentUserDeptRoleId
);

export const notificationByRole = createSelector(
  [authSelector],
  auth => auth.notificationByRole
);
