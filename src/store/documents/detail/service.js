import _ from 'lodash';

import { ATTACHMENT_TYPES } from 'eoffice/constants/common';

import Axios from 'axios';
import eConfig from '../../../config.json';
import axios from '../../axios';
import { listDepartments } from '../../users/service';
import { DOCUMENT_TYPE } from '../../../constants/documents';

const loadCommentDetails = async comments => {
  const commentIds = comments.map(comment => comment.id);

  const [allAttachments, allUsers] = await Promise.all([
    axios
      .get('/attachment/findAllByComments', { params: { commentIds, sort: 'createTime,desc' } })
      .then(res => res.data),
    axios
      .get('/vbCommentToUserView', { params: { commentIds, sort: 'createTime,desc' } })
      .then(res => res.data),
  ]);
  const res = comments.map(comment => ({
    ...comment,
    attachments: allAttachments.filter(attachment => attachment.objectId === comment.id),
    toUsers: allUsers.filter(userView => userView.commentId === comment.id),
  }));
  return res;
};

export const addComment = data =>
  axios
    .post('/vbComment', data)
    .then(res => loadCommentDetails([res.data]))
    .then(comments => comments[0]);

export const getIncomingDocument = async id => {
  const [incomingDoc, docInBook] = await Promise.all([
    axios.get(`/incomingDoc/${id}`).then(res => res.data),
    axios.get(`/docInBook/findByDocId?docId=${id}`).then(response => response.data),
  ]);
  incomingDoc.bookNumber = docInBook.bookNumber;
  return incomingDoc;
};

export const getOutgoingDocument = id => axios.get(`/outgoingDoc/${id}`).then(res => res.data);

export const getFlowInstance = ({ flowInstanceId }) =>
  axios.get(`/vbFlowInstance/${flowInstanceId}`).then(res => {
    return res.data;
  });

export const getLatestVbFlowInstance = ({ documentId }) =>
  axios
    .get('/vbFlowInstance', {
      params: { docId: documentId, page: 0, size: 1, sort: 'createTime,desc' },
    })
    .then(res => (_.isArray(res.data) ? res.data[0] : null));

export const getVbInProcess = async ({ processId }) =>
  axios.get(`/vbIncomingProcess/${processId}`).then(res => {
    return res.data;
  });

export const getVbOutProcess = async ({ processId }) =>
  axios.get(`/vbOutgoingProcess/${processId}`).then(res => res.data);

export const getVbProcessStep = ({ stepId }) =>
  axios.get(`/vbStep/${stepId}`).then(res => {
    return res.data;
  });

export const listAttachments = async ({ attachmentType, documentId }) => {
  if (Object.values(ATTACHMENT_TYPES).indexOf(attachmentType) === -1) {
    throw new Error('Invalid document attachment type');
  }

  const res = await axios.get('/attachment', {
    params: { objectId: documentId, objectType: attachmentType },
  });
  return res.data;
};

export const findAllByVbIncomingDoc = id => {
  return axios
    .get('actionLog/findAllByVbIncomingDoc', {
      params: {
        sort: 'createTime,desc',
        page: 0,
        size: 1000,
        objectId: id,
        subDocId: id,
      },
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    });
};

export const listAccessibleActionLogs = ({ vbIncomingProcessId }) =>
  axios
    .get('/actionLog/findAllAccessible', {
      params: { vbIncomingProcessId, sort: 'createTime,desc', page: 0, size: 1000 },
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    });

export const listActionLogsByOutgoingDoc = ({ outgoingDocId }) =>
  axios
    .get('/actionLog/findAllByVbOutgoingDoc', {
      params: { objectId: outgoingDocId, sort: 'createTime,desc', page: 0, size: 1000 },
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    });

export const listComments = async ({
  documentId,
  commentType,
  sort = 'createTime,desc',
  page = 0,
  size = 1000,
}) => {
  const comments = await axios
    .get('/vbComment/findAllBySenderIdOrReceiverId', {
      params: { objectId: documentId, objectType: commentType, sort, page, size },
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    });
  if (comments?.length) {
    return loadCommentDetails(comments);
  }
  return [];
};

export const listNextSteps = ({ flowId, stepId, stepType }) =>
  axios.get('/nextStepInfoView/nextSteps', { params: { flowId, stepId, stepType } }).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const listIncomingDocsWithDept = async ({ outgoingDocId }) => {
  const [docs, depts] = await Promise.all([
    axios.get('/incomingDoc', { params: { vbOutgoingDocId: outgoingDocId } }).then(res => res.data),
    listDepartments(),
  ]);

  const deptsById = _.keyBy(depts, 'id');
  return docs.map(doc => ({
    ...doc,
    deptName: doc.toDeptId ? deptsById[doc.toDeptId].deptName : doc.toDeptName,
  }));
};

export const listIncomingProcesses = async params =>
  axios.get('/vbIncomingProcess', { params }).then(res => res.data);

export const listOutgoingProcesses = async params =>
  axios.get('/vbOutgoingProcess', { params }).then(res => res.data);

export const listAccessibleIncomingProcesses = async ({ processId }) =>
  axios
    .get('/vbIncomingProcess/findAllAccessible', { params: { vbIncomingProcessId: processId } })
    .then(res => res.data);

export const listReceivers = async ({ docId, sort }) =>
  axios.get('/vbOutgoingDocReceivers', { params: { docId, sort } }).then(res => res.data);

// document actions
export const chuyenXuLyVbDi = async ({ documentId, data }) =>
  axios.post(`/vbOutgoingProcess/chuyenXuLi/${documentId}`, data).then(res => res.data);

export const ketThucVbDi = async ({ documentId, data }) =>
  axios.post(`/vbOutgoingProcess/ketThuc/${documentId}`, data).then(res => res.data);

export const tuChoiVbDi = async ({ documentId, data }) =>
  axios.post(`/vbOutgoingProcess/tuChoi/${documentId}`, data).then(res => res.data);

export const thuHoiVbDi = async ({ processId, data }) =>
  axios.put(`/vbOutgoingProcess/${processId}/thuHoi`, data).then(res => res.data);

export const vanThuThuHoiVbDi = async ({ documentId, data }) =>
  axios.put(`/outgoingDoc/${documentId}/thuHoi`, data).then(res => res.data);

export const chuyenXuLyVbDen = async ({ documentId, data }) =>
  axios.post(`/vbIncomingProcess/chuyenXuLi/${documentId}`, data).then(res => res.data);

export const chuyenXuLiDonVi = async ({ documentId, data }) =>
  axios.post(`/vbIncomingProcess/chuyenXuLiDonVi/${documentId}`, data).then(res => res.data);

export const ketThucVbDen = async ({ documentId, data }) =>
  axios.post(`/vbIncomingProcess/ketThuc/${documentId}`, data).then(res => res.data);

export const tuChoiVbDen = async ({ processId, data }) =>
  axios.put(`/vbIncomingProcess/${processId}/tuChoi`, data).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const thuHoiVbDen = async ({ processId, data }) =>
  axios.put(`/vbIncomingProcess/${processId}/thuHoi`, data).then(res => res.data);

export const vanThuThuHoiVbDen = async ({ documentId, data }) =>
  axios.put(`/incomingDoc/${documentId}/thuHoi`, data).then(res => res.data);

export const ccVanBan = async ({ data }) =>
  axios.post(`/outgoingDoc/ccVanBan`, data).then(res => res.data);

export const vanBanHasCC = async ({ documentId }) =>
  axios.get(`/outgoingDoc/getListUserHasCC/${documentId}`).then(res => res.data);

export const getGroups = async () =>
  axios.get(`/groups?page=0&size1000`).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const soTrangVanBan = async ({ attachmentId }) =>
  Axios.get(`${eConfig.baseUrl}attachment/getAttachmentMetadata?vbAttachmentId=${attachmentId}`)
    .then(res => res.data)
    .catch(err => err.message);

export const soTrangVanBanHistory = async ({ attachmentMetaId }) =>
  Axios.get(`${eConfig.baseUrl}attachment/getAttachmentMetadataComment=${attachmentMetaId}`)
    .then(res => res.data)
    .catch(err => err.message);

export const uploadBase64Image = ({ image, documentId }) => {
  Axios.post(`${eConfig.baseUrl}attachment/uploadImageComment`, {
    base64: image.base64,
    vbAttachmentId: image.vbAttachmentId,
    pageNumber: image.pageNumber,
    objectType: DOCUMENT_TYPE.VB_DI,
    objectId: documentId,
  }).then(res => res.data.id);
};

export const findTrangKySo = docId =>
  Axios.get(`${eConfig.baseUrl}attachment/findTrangKySo/${docId}`);

export const findReferenceOutgoingAttachment = docId =>
  Axios.get(`${eConfig.baseUrl}attachment/findReferenceOutgoingAttachment`, {
    params: {
      docId,
    },
  });
export const findVbAttachmentById = vbAttachmentId =>
  Axios.get(`${eConfig.baseUrl}vbAttachment/${vbAttachmentId}`);

export const getDeptInGroups = groupId =>
  Axios.get(`${eConfig.baseUrl}groups/userDeptInGroup/${groupId}`);

export const findDocRelations = docId =>
  Axios.get(`${eConfig.baseUrl}docRelation`, {
    params: {
      objectId: docId,
    },
  });

export const findPhieuYKien = docId =>
  Axios.get(`${eConfig.baseUrl}vbOpinionForm/findByDocId`, {
    params: {
      docId: docId,
    },
  });

export const findPhieuYKienByDocIdAndUser = (docId, userDeptRoleId) =>
  Axios.get(`${eConfig.baseUrl}vbOpinionForm/findByDocIdAndUser`, {
    params: { docId, userDeptRoleId },
  });

export const findByIdDelegate = id => Axios.get(`${eConfig.baseUrl}delegate/${id}`);

export const choYKien = async ({ documentId, data }) =>
  axios.post(`/vbIncomingProcess/choYKien/${documentId}`, data).then(res => res.data);

export const getHistoryProcessesIn = (docId, subDocId) => {
  let params = { docId: docId, subDocId: subDocId };
  return axios
    .get('vbIncomingProcess/getHistoryProcesses', { params: params })
    .then(res => res.data);
};

export const findByDocIdAndRelationType = (docId, relationType) => {
  return axios
    .get('/vbDocUser/findByDocIdAndRelationType', {
      params: { docId, relationType },
    })
    .then(res => res.data);
};

export const findByVbIncomingProcessId = (processId) => {
  return axios
    .get('/vbDocUser/findByVbIncomingProcessId', {
      params: { processId },
    })
    .then(res => res.data);
};

export const findBccInfoByVbIncomingDocId = vbIncomingDocId => {
  return axios
    .get('/vbDocBccInfo/findAllByVbIncomingDocId', {
      params: { vbIncomingDocId: vbIncomingDocId },
    })
    .then(res => res.data);
};
export const markAsDaXLForBcc = id => {
  return axios.put(`/vbDocUser/${id}/markAsDaXLForBcc`);
};
