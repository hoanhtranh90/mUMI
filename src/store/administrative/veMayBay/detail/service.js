import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const getDetailVeMayBay = ({ caseMasterId }) =>
  axios.get(`/vemaybay/detail/${caseMasterId}`, null).then(res => res.data);

export const getPositions = () => axios.get(`/vemaybay/getPositions`, null).then(res => res.data);

export const getAirports = () => axios.get(`/vemaybay/getAirports`, null).then(res => res.data);

export const getDepartments = () =>
  axios.get(`/vemaybay/getDepartments`, null).then(res => res.data);

export const approveVeMayBay = data => {
  axios.post('/vemaybay/approve', data).then(res => res.data);
};

export const updateVeMayBay = data  => {
  axios.post('/vemaybay/update', data).then(res => res.data);
};

export const cancelVeMayBay = data => {
  axios.post('/vemaybay/cancel', data).then(res => res);
};

export const getListRequest = (query) => {
  return axios.get('hcMasterCaseRequestView',{ params: formatQuery(query) }).then(res => {
      return res.data
    }
  );
}

