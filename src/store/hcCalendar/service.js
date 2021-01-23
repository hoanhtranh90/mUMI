import axios from 'eoffice/store/axios';
import { formatQuery } from 'eoffice/utils/utils';

export const getHcFlows = flowCode =>
  axios.get(`/hanhchinh/getFlowsAvailable?flowCode=${flowCode}`).then(res => {
    return res.data.hcFlows;
  });

export const getAcceptedRequestsIncludeCoopDepts = query =>
  axios
    .get('/lichtuan/getAcceptedRequestsIncludeCoopDepts', { params: formatQuery(query) })
    .then(res => {
      return res.data.hcCaseCalendars;
    });

export const getAttachmentHcCalendar = hcCalendar => {
  return axios
    .get('/vbAttachment/findAllByHcCalendar', {
      params: { hcCaseMasterId: hcCalendar.caseMasterId },
    })
    .then(res => res.data || []);
};

export const getCalendarShared = query =>
  axios.get('/hcCaseCalendar/getCalendarShared', { params: formatQuery(query) }).then(res => {
    return res.data;
  });

export const share = (hcCalendarId, form) =>
  axios.post(`/hcCaseCalendar/${hcCalendarId}/share`, form).then(res => {
    return res.data;
  });

export const loadUserForShare = query =>
  axios
    .get('/userDeptRoleView/findAllForSharingHcCaseCalendar', { params: { ...query } })
    .then(res => {
      return res.data;
    });

export const findAllByActorGroup = actorGroup =>
  axios
    .get('userDeptRoleView/findAllByActorGroup', {
      params: { actorGroup },
    })
    .then(res => res.data);

export const findById = caseMasterId =>
  axios.get(`/lichtuan/detail/${caseMasterId}`).then(res => res.data);

export const findAllByHcCaseMasterId = hcReferenceId =>
  axios
    .get(`/hcCaseMasterUser/findByHcReferenceId`, { params: { hcReferenceId } })
    .then(res => res.data);

export const joinRoom = (id) => {
  return axios.post(`hcCaseCalendar/${id}/joinRoom`);
}
