/* eslint-disable no-unused-vars */
import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const getDetailLT = ({ caseMasterId }) =>
  axios.get(`/lichtuan/detail/${caseMasterId}`, null).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const approveSchedule = data => {
  axios.post('/lichtuan/approve', data).then(res => {
    // console.log(res.data);
    return res.data;
  });
};
export const updateSchedule = data => {
  axios.post('/lichtuan/update', data).then(res => {
    // console.log(res.data);
    return res.data;
  });
};
export const cancelSchedule = data => {
  axios.post('/lichtuan/cancel', data).then(res => {
    // console.log(res.data);
    return res.data;
  });
};

// export const getlistLanhDao = query =>
//   axios.get('/lichtuan/getListLDLichTuan', { params: formatQuery(query) }).then(res => res.data);

export const getlistLanhDao = query =>
  axios.get('/lichtuan/getListLDLichTuan', { params: formatQuery(query) }).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const getListDVPH = query =>
  axios.get('/lichtuan/getListDVPH', { params: formatQuery(query) }).then(res => {
    // console.log(res.data);
    return res.data;
  });

export const getRoomFree = query =>
  axios.get('/lichtuan/getListRoomFree', { params: formatQuery(query) }).then(res => res.data);

export const calendarRoomDetail = query =>
  axios
    .get(
      '/lichtuan/getNeedProcessRequests?startDate=1565542800000&endDate=1566147599999&size=10&page=1&sort=createTime,desc&keyword='
    )
    .then(res => {
      // console.log('--------', res.data);

      return res.data.hcCaseCalendars;
    });

export const getAttachmentHcCalendar = ({ caseMasterId }) =>
  axios
    .get(`/vbAttachment/findAllByHcCalendar?hcCaseMasterId=${caseMasterId}`)
    .then(res => res.data);


export const findAllByHcCaseMasterId = hcReferenceId =>
  axios
    .get(`/hcCaseMasterUser/findByHcReferenceId`, { params: { hcReferenceId } })
    .then(res => res.data);

export const joinRoom = (id) => {
  return axios.post(`/hcCaseCalendar/${id}/joinRoom`);
}
export const findDeptById = (id) => {
  return axios.get(`/department/${id}`);
}
