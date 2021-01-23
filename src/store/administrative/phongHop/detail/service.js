import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const getDetailPH = ({ caseMasterId }) =>
  axios.get(`/phonghop/detail/${caseMasterId}`, null).then(res => res.data);

export const approveMeeting = data => {
  axios.post('/phonghop/approve', data).then(res => res.data);
};

export const updateMeeting = data => {
  axios.post('/phonghop/update', data).then(res => res.data);
};

export const cancelMeeting = data => {
  axios.post('/phonghop/cancel', data).then(res => res.data);
};

export const getRoomFree = query =>
  axios.get('/phonghop/roomfree', { params: formatQuery(query) }).then(res => {
    return res.data;
  });
