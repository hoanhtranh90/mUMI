import _ from 'lodash';
import { createSelector } from 'redux-starter-kit';

export const userDeptRoleViewSelector = createSelector(
  ['users'],
  users => _.values(users.userDeptRoleView)
);

export const userViewByIdSelector = createSelector(
  ['users.userDeptRoleView', { path: 'userViewId', argIndex: 1 }],
  (userViews, id) => userViews[id]
);

export const userViewsByIdsSelector = createSelector(
  ['users.userDeptRoleView', { path: 'ids', argIndex: 1 }],
  (userViews, ids) => _.map(ids, id => userViews[id])
);

export const userViewByDeptSelector = createSelector(
  [userDeptRoleViewSelector],
  users => {
    const depts = [];
    const deptIdToIdx = {};

    _.forEach(users, userView => {
      if (!_.isNumber(deptIdToIdx[userView.deptId])) {
        deptIdToIdx[userView.deptId] = depts.length;
        depts.push({
          id: userView.deptId,
          name: userView.deptName,
          children: [],
        });
      }

      const deptIdx = deptIdToIdx[userView.deptId];
      depts[deptIdx].children.push({
        ...userView,
      });
    });

    return depts;
  }
);

export const departmentsSelector = createSelector(
  ['users'],
  users => users.departments
);
