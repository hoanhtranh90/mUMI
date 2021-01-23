import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const getDetailDieuXe = ({ caseMasterId }) =>
  axios.get(`/dieuxe/detail/${caseMasterId}`, null).then(res => res.data);

export const approveDieuXe = data => {
  axios.post('/dieuxe/approve', data).then(res => res.data);
};

export const updateDieuXe = data => {
  axios.post('/dieuxe/update', data).then(res => res.data);
};

export const cancelDieuXe = data => {
  axios.post('/dieuxe/cancel', data).then(res => res.data);
};

export const listFreeCars = query =>
  axios.get('/dieuxe/carfree', { params: formatQuery(query) }).then(res => res.data);

export const listDriver = query =>
  axios.get('/dieuxe/listDriver', { params: formatQuery(query) }).then(res => res.data);

export const calendarCar = query =>
  axios.get('/dieuxe/calendarCar', { params: formatQuery(query) }).then(res => res.data.data);
