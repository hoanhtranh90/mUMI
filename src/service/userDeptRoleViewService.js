import axios from 'eoffice/store/axios';

export const loadUserForShareNote = query =>
  axios
    .get('/userDeptRoleView/findAllForSharingNote', { params: { ...query } })
    .then(res => {
      return res.data;
    });
