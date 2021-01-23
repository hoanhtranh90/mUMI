import { ACTION_LOG_TYPES } from 'eoffice/constants/common';
import {DOCUMENT_TYPE} from '../../../constants/documents';

import axios from '../../axios';

const loadCommentAttachments = async comments => {
  const commentIds = comments.map(comment => comment.id);

  const attachments = await axios
    .get('/attachment/findAllByComments', { params: { commentIds, sort: 'createTime,desc' } })
    .then(res => res.data);

  return comments.map(comment => ({
    ...comment,
    attachments: attachments.filter(attachment => attachment.objectId === comment.id),
  }));
};

export const getTask = ({ taskId }) => axios.get(`/tkTask/${taskId}`).then(res => res.data);

export const listActionLogs = taskId =>
  axios
    .get('/actionLog', {
      params: {
        objectId: taskId,
        objectType: ACTION_LOG_TYPES.CONG_VIEC,
        sort: 'createTime,desc',
        page: 0,
        size: 1000,
      },
    })
    .then(res => res.data);

export const listAttachments = ({ taskId }) =>
  axios.get('/attachment/findAllByTask', { params: { taskId } }).then(res => res.data);

export const listComments = taskId =>
  axios
    .get('/vbComment/findAllTaskComments', { params: { objectId: taskId } })
    .then(res => res.data)
    .then(comments => (comments?.length ? loadCommentAttachments(comments) : comments));

export const listCoordinators = (taskId) => {
  return axios.get(`/tkTaskAssignView?taskId=${taskId}`).then(res => {
    return res.data
  });
}
export const listRelatedDocs = ({ taskId }) =>
  axios.get('/tkTaskDocRelation', { params: { taskId } }).then(res => res.data);

export const listSubtasks = ({ taskId }) =>
  axios.get(`/tkTask/${taskId}/findAllChildTask`).then(res => res.data);

export const findReceiversForTask = () =>
  axios.get(`/userDeptRoleView/findAllReceiversForTask?sort=deptName&sort=positionOrder&sort=fullName&size=1000`)
        .then(res => res.data);
export const findAllAssignersForTask = () =>
  axios
    .get('/userDeptRoleView/findAllAssignersForTask?sort=deptPath&sort=positionOrder&sort=fullName&size=1000')
    .then(res => res.data);

export const findAllCoordinatorsForTask = () =>
  axios
    .get('/userDeptRoleView/findAllCoordinatorForTask?delegatorId=&sort=deptName&sort=positionOrder&sort=fullName&size=1000')
    .then(res => res.data);

export const findAllDocuments = (type, keyword, page) => {
  const url = type === DOCUMENT_TYPE.VB_DEN ?
    `/vbIncomingDocUserView?usingAdvanceSearch=0&keyword=${keyword}&status=&sort=updateTime,desc&page=${page}&size=10`
    : `/vbOutgoingDocUserView?usingAdvanceSearch=0&keyword=${keyword}&status=&docStatus=3&sort=updateTime,desc&page=${page}&size=10`
  return axios
    .get(url)
    .then(res => {
      return res.data
    });
}

export const addComment = data =>
  axios
    .post('/vbComment', data)
    .then(res => loadCommentAttachments([res.data]))
    .then(comments => comments[0]);

// task actions
export const cancelTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/cancelTask`, data).then(res => res.data);

export const completeTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/finishTask`, data).then(res => res.data);

export const approveCompletedTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/approveCompletedTask`, data).then(res => res.data);

export const refuseCompletedTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/refuseCompletedTask`, data).then(res => res.data);

export const approveTask = ({ taskId }) =>
  axios.put(`/tkTask/${taskId}/approveTask`).then(res => res.data);

export const refuseTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/refuseTask`, data).then(res => res.data);

export const pauseTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/pauseTask`, data).then(res => res.data);

export const extendTask = ({ taskId, data }) =>
  axios.put(`/tkTask/${taskId}/changeDeadline`, data).then(res => res.data);

export const updateProgress = ({ data }) => axios.post('/tkTaskReport', data).then(res => res.data);
export const createTask = form => axios.post('/tkTask', form).then(
  res => res.data);
