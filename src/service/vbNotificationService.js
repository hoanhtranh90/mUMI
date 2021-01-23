import axios from 'eoffice/store/axios';

const vbNotificationService = {
  deleteAllNotify() {
    return axios.post('/vbNotification/maskAsReadAll').then(res => res.data);
  },
  markAsReadAllNotify() {
    return axios.post('/vbNotification/maskAsReadAll').then(res => res.data);
  },
};
