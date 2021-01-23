import axios from 'eoffice/store/axios';
import {formatQuery} from "../../../utils/utils";

export const getListRequest = (query) => {
  return axios.get('hcMasterCaseRequestView',{ params: formatQuery(query) }).then(res => {
      return res.data
    }
  );
}

export const getHcCaseHotel = hcCaseMasterId => {
  return axios.get('hcCaseHotel/findByHcCaseMaster', { params: {hcCaseMasterId} } ).then(res => res.data);
};

export const getHcCaseHotelPrice = hcCaseMasterId => {
  return axios.get('hcCaseHotelPrice/findByHcCaseMaster', { params: {hcCaseMasterId} } ).then(res => res.data);
};

export const getHcCaseHotelUserView = caseMasterId => {
  return axios.get('hcCaseHotelUserView/findAllByCaseMasterId', { params: {caseMasterId} } ).then(res => res.data);
};

export const getHcCaseHotelLocationView = hcCaseMasterId => {
  return axios.get('hcCaseHotelLocationView/findByHcCaseMaster', { params: {hcCaseMasterId} } ).then(res => res.data);
};

export const getAllActions = hcFlowInstanceId => {
  return axios.get('hcStateToState/findAllActionsByHcCaseCommands', { params: {hcFlowInstanceId} } ).then(res => res.data);
};

export const getFileAttachments = (hcCaseMasterId,type) => {
  return axios.get('hcCaseFlightFile/findAllByHcCaseMasterId', { params: {hcCaseMasterId, type} } ).then(res => res.data);
};

export const getRequester = (hcCaseMasterId) => {
  return axios.get('userDeptRoleView/findRequesterForHc', { params: {hcCaseMasterId} } ).then(res => res.data);
};

export const getHcCaseMaster = id => {
  return axios.get(`hcCaseMaster/${id}`).then(res => res.data);
};

export const getPositions = () => axios.get(`/vemaybay/getPositions`, null).then(res => res.data);
export const getDepartments = () =>
  axios.get(`/vemaybay/getDepartments`, null).then(res => res.data);


export const getHotels = () => axios.get(`category/findAllByCategoryGroupCode?categoryGroupCode=hcHotel.hotel`, null).then(res => res.data)

export const getLocations = () => axios.get(`category/findAllByCategoryGroupCode?categoryGroupCode=hcHotel.location`, null).then(res => res.data)

export const cancelHotel = form => axios.post('khachsan/cancel', form);

export const updateHotel = form => axios.post(`/khachsan/update`, form)

export const acceptHotel = form => axios.post(`/khachsan/approve`, form);

export const createKhachsan = form => axios.post('/khachsan/create', form);

