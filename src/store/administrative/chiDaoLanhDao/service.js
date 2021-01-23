import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const listChiDao = (data, query) =>
  axios
    .post('/chidao/searchForLD', data, { params: formatQuery(query) })
    .then(res => res.data.data);

export const getDetailChiDao = query =>
  axios.get('/chidao/detail', { params: formatQuery(query) }).then(res => res.data);

export const getListLDDV = query =>
  axios.get('/chidao/getListLDDV', { params: formatQuery(query) }).then(res => res.data.users);

export const getListDVCT = query =>
  axios
    .get('/chidao/getListDVTT', { params: formatQuery(query) })
    .then(res => res.data.departments);

export const getListCVDV = query =>
  axios.get('/chidao/getListCVDV', { params: formatQuery(query) }).then(res => res.data.users);

export const updateForLD = data =>
  axios.post('/chidao/updateForLD', data).then(res => res.data.data);
