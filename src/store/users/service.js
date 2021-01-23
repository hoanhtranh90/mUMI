import _ from 'lodash';

import { STEP_TYPE } from 'eoffice/constants/documents';
import { listNextSteps } from '../documents/detail/service';
import axios from '../axios';
import { compareUserDeptRoleView, compareDeptPath } from '../../utils/utils';

export const loadUserDeptRoleView = async ({ flowId, stepId }) => {
  const nextSteps = await listNextSteps({ flowId, stepId, stepType: STEP_TYPE.CA_NHAN });
  const processStep = async nextStep => {
    const params = _.pickBy(
      nextStep,
      (v, k) => ['deptId', 'roleId', 'userId', 'vbStepInfoId'].includes(k) && !!v
    );

    const paramsObj = {
      ...params,
      vbStepInfo: params.vbStepInfoId,
    };

    delete paramsObj.deptId;
    delete paramsObj.roleId;
    delete paramsObj.userId;
    delete paramsObj.vbStepInfoId;

    const userDeptRoleViews = await axios
      .get('/userDeptRoleView/findAllActiveForStepInfo', { params: paramsObj })
      .then(res => {
        return res.data.sort((a, b) => compareUserDeptRoleView(a, b));
        // return res.data;
      })
      .catch(err => {});

    return userDeptRoleViews.map(userView => ({
      ...userView,
      stepId: nextStep.id,
      order: nextStep.order || 999,
    }));
  };

  const userViews = await Promise.all(nextSteps.map(processStep));
  return _.flatten(userViews);
};

export const listDepartments = () =>
  axios.get('/department', { params: { page: 0, size: 1000 } }).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const searchUsers = ({ keyword, page, size, sort }) =>
  axios
    .get('/usersView/search', { params: { keyword, page, size, sort } })
    .then(res => res.data)
    .catch(() => []);

export const getUserCCVanBan = ({ deptId, docId }) => {
  return axios
    .get(
      `/userDeptRoleView/findAllForDocOutCC?deptId=${deptId}&sort=positionOrder&sort=fullName&size=1000&docId=${docId}`
    )
    .then(res => {
      // console.log(res.data);
      return res.data.sort((a, b) => compareUserDeptRoleView(a, b));
      // return res.data.sort((a, b) => compareDeptPath(a, b));
    });
};
