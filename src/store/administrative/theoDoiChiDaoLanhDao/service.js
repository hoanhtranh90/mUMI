import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const listChiDao = (data, query) =>
  axios.post('/chidao/searchForLD', data, { params: formatQuery(query) }).then(res => {
    return res.data.data;
  });

export const getDetailChiDao = query =>
  axios.get('/chidao/detail', { params: formatQuery(query) }).then(res => {
    return res.data;
  });

export const getListLDDV = query =>
  axios.get('/chidao/getListLDDV', { params: formatQuery(query) }).then(res => {
    return res.data.users;
  });

export const getListDVCT = query =>
  axios.get('/chidao/getListDVTT', { params: formatQuery(query) }).then(res => {
    return res.data.departments;
  });

export const getListCVDV = query =>
  axios.get('/chidao/getListCVDV', { params: formatQuery(query) }).then(res => {
    return res.data.users;
  });

export const updateForLD = data =>
  axios.post('/chidao/updateForLD', data).then(res => {
    return res.data;
  });

export const listChiDaoNew = (query) =>
  axios.get('hcCommandSearchView',{ params: formatQuery(query) }).then(res =>
  {return res.data;}
);

export const getHcCommandSearchViewByID = (id) =>
  axios.get(`hcCommandSearchView/${id}`).then(res =>
    {return res.data;}
  );

export const getListHcCommands = deptId =>
  axios.get('userDeptRoleView/findAllForHcCommands', { params: {deptId} }).then(res => {
    return res.data;
  });
export const getListHcCaseCommands = deptId =>
  axios.get('department/findAllForHcCaseCommands', { params: {deptId} }).then(res => {
    return res.data;
  });

export const getFileAttachments = hcCaseCommandsCommonId =>
  axios.get('hcDocRelation/findAllForHcCaseCommandsCommon', { params: {hcCaseCommandsCommonId} }).then(res => {
  return res.data;
});

export const getFileAttachmentsReport = hcCaseCommandsId =>
  axios.get('hcDocRelation/findAllForHcCaseCommands', { params: {hcCaseCommandsId} }).then(res => {
    return res.data;
  });

export const getListOutGoingDocs = (deptId) =>
  axios.get(`outgoingDoc/findAllForHcCommandsDocRelation?deptId=${deptId}&keyword=&sort=docDate%2Cdesc&page=0&size=30`).then(res => {
    return res.data;
  });

export const updateCommands = (id,updateForm) =>
  axios.get(`hcCaseCommandsCommon/${id}`, updateForm).then(res => {
    return res.data;
  });

export const getListPhoiHopChuTri = hcCaseCommandsCommonId =>
  axios.get('hcCaseCommands/findAllByHcCaseCommandsCommonId', { params: {hcCaseCommandsCommonId} }).then(res => {
    return res.data;
  });

export const getHistoryAction = (hcCaseCommandsId, hcCaseCommandsCommonId) =>
  axios.get('actionLog/findAllForHcCaseCommands', { params: {hcCaseCommandsId,hcCaseCommandsCommonId} }).then(res => {
    return res.data;
  });

export const findByCaseMasterId = (caseMasterId) =>
  axios.get('hcCaseCommands/findByCaseMasterId', { params: {caseMasterId} }).then(res => {
    return res.data;
});

export const findByHcCaseCommandsId = (hcCaseCommandsId) =>
  axios.get('hcCaseCommandsUser/findByHcCaseCommandsId', { params: {hcCaseCommandsId} }).then(res => {
    return res.data;
  });

export const findUserDeptRoleViewByID = id =>
  axios.get(`userDeptRoleView/${id}`).then(res => {
    return res.data;
  });
export const findDeptByID = id =>
  axios.get(`department/${id}`).then(res => {
    return res.data;
  });

export const findAllSectorByGroupCode = (groupCode) =>
  axios.get('categoryView/findAllByGroupCode', { params: {groupCode} }).then(res => {
    return res.data;
  });
