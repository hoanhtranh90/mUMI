import axios from 'eoffice/store/axios';

export const createSchedule = data =>
  axios.post('/lichtuan/create', data).then(res => {
    return res.data;
  });
