import { formatQuery } from 'eoffice/utils/utils';
import axios from '../../axios';

export const listNotifications = async query =>
  axios.get('/vbNotification', { params: formatQuery(query) }).then(res => {
    return res.data;
  });

export const markAsReadNotify = id =>
  axios.post(`/vbNotification/maskAsRead/${id}`).then(res => res.data);

export const deleteNotify = id => axios.delete(`/vbNotification/${id}`).then(res => res.data);

export const deleteAllNotify = () => axios.delete(`/vbNotification/all`).then(res => res.data);

export const markAsReadAllNotify = () =>
  axios.post(`/vbNotification/maskAsReadAll`).then(res => res.data);

export const getProcessIdVbOutgoingDoc = docId =>
  axios.get(`/vbOutgoingDocUserView/findByDocId/${docId}`);

export const getProcessIdVbIncomingDoc = docId =>
  axios.get(`/vbIncomingDocUserView/findByDocId/${docId}`);
