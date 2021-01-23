import { CATEGORY_GROUP_CODE } from 'eoffice/constants/documents';
import { formatQuery, formatQueryDocument } from 'eoffice/utils/utils';
import axios from '../../axios';

export const listToTrinh = async query => {
  return axios
    .get('/vbIncomingDocUserView/findAllToTrinhQuaHan', { params: formatQueryDocument(query) })
    .then(result => {
      return result.data.map(doc => ({
        ...doc,
        key: JSON.stringify(doc.vbIncomingDocUserViewKey),
        docId: doc.vbIncomingDocUserViewKey.id,
      }));
    });
};

export const findAllToTrinhQuaHanCount = form => {
  form.fromSendTime = form.docDate[0].getTime();
  form.toSendTime = form.docDate[1].getTime();
  return axios.get('/vbIncomingDocUserView/findAllToTrinhQuaHan/count', {
    params: { ...form },
  });
};

// we extract id out for convinience
export const listInDocuments = async query => {
  return axios
    .get('/vbIncomingDocUserView', { params: formatQueryDocument(query) })
    .then(result => {
      return result.data.map(doc => ({
        ...doc,
        key: JSON.stringify(doc.vbIncomingDocUserViewKey),
        docId: doc.vbIncomingDocUserViewKey.id,
      }));
    });
};

export const listOutDocuments = async query => {
  return axios.get('/vbOutgoingDocUserView', { params: formatQueryDocument(query) }).then(result =>
    result.data.map(doc => ({
      ...doc,
      key: JSON.stringify(doc.vbOutgoingDocUserViewKey),
      docId: doc.vbOutgoingDocUserViewKey.id,
    }))
  );
};

export const listCategories = () =>
  axios
    .get('categoryView', {
      params: { groupCode: CATEGORY_GROUP_CODE.DOC_TYPE, sort: 'order,asc' },
    })
    .then(res => res.data);

export const countInDocuments = async query =>
  axios.get('/vbIncomingDocUserView/count', { params: formatQueryDocument(query) }).then(res => {
    return res.data;
  });

export const findByDocIdAndUserDeptRoleId = async (docId, params) => {
  return axios.get('/vbIncomingDocUserView/findByDocIdAndUserDeptRoleId/' + docId, {
    params: params,
  });
};

export const findByDocIdAndUserDeptRoleIdWithDocOut = async (docId, params) => {
  return axios.get('/vbOutgoingDocUserView/findByDocIdAndUserDeptRoleId/' + docId, {
    params: params,
  });
};

export const userDeptRoleView = async params => {
  return axios.get('/userDeptRoleView', { params: params });
};
export const countOutDocuments = async query => {
  return axios
    .get('/vbOutgoingDocUserView/count', { params: formatQueryDocument(query) })
    .then(res => {
      return res.data;
    });
};

export const listPriorities = () =>
  axios
    .get('categoryView', {
      params: { groupCode: CATEGORY_GROUP_CODE.PRIORITY, sort: 'order,asc' },
    })
    .then(res => res.data);

export const markAsRead = ({ documentId, processId }) =>
  axios.post(`/outgoingDoc/maskAsRead`, null, { params: { processId, docId: documentId } });
