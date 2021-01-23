import { formatQuery } from 'eoffice/utils/utils';
import axios from 'eoffice/store/axios';

export const getFlowInfo = query =>
  axios.get('/hanhchinh/getFlowInfo', { params: formatQuery(query) }).then(res => {
    return res.data.hcFlow;
  });

export const listPendingRequest = query =>
  axios.get('/hanhchinh/filterProcessingRequest', { params: formatQuery(query) }).then(res => {
    // console.log(res.data.data);
    return res.data.data;
  });

export const listDoneRequest = query =>
  axios.get('/hanhchinh/filterProcessedRequest', { params: formatQuery(query) }).then(res => {
    // console.log(res.data.data);
    return res.data.data;
  });

// export const listAcceptedRequests = query =>
//   axios.get('/lichtuan/getAcceptedRequests', { params: formatQuery(query) }).then(res => {
//     console.log(query);
//     // console.log(res.data.hcCaseCalendars);
//     return res.data.hcCaseCalendars;
//   });

export const listAcceptedRequests = query =>
  axios
    .get('/lichtuan/getAcceptedRequestsIncludeCoopDepts', { params: formatQuery(query) })
    .then(res => {
      // console.log(query);
      // console.log(res.data.hcCaseCalendars);
      return res.data.hcCaseCalendars;
    });

// eslint-disable-next-line no-unused-vars
export const listSentRequests = query =>
  axios.get('/lichtuan/getSentRequests', { params: formatQuery(query) }).then(res => {
    // console.log(query);
    // console.log(res.data.hcCaseCalendars);
    return res.data.hcCaseCalendars;
  });

// eslint-disable-next-line no-unused-vars
export const listNeedProcessRequests = query =>
  axios.get('/lichtuan/getNeedProcessRequests', { params: formatQuery(query) }).then(res => {
    // console.log(res.data.hcCaseCalendars);
    return res.data.hcCaseCalendars;
  });
export const getCurrentState = query =>
  axios.get('/hanhchinh/getCurrentState', { params: formatQuery(query) }).then(res => {
    return res.data;
  });
export const getAvailableActions = query =>
  axios.get('/hanhchinh/getAvailableActions', { params: formatQuery(query) }).then(res => {
    return res.data;
  });

export const getFlowsCanStart = query =>
  // axios.get('/hanhchinh/getFlowsCanStart', { params: formatQuery(query) }).then(res => {
  axios.get('/hanhchinh/getFlowsCanStart?flowCode=LICH_TUAN').then(res => {
    // console.log(res.data);
    return res.data;
  });

export const getFlowsAvailable = query =>
  // axios.get('/hanhchinh/getFlowsAvailable', { params: formatQuery(query) }).then(res => {
  axios.get('/hanhchinh/getFlowsAvailable?flowCode=LICH_TUAN').then(res => {
    // console.log(res.data);
    return res.data;
  });


export const findAllByActorGroup = actorGroup =>
axios
  .get('userDeptRoleView/findAllByActorGroup', {
    params: { actorGroup },
  })
  .then(res => res.data);