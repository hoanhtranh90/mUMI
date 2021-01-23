import axios from 'eoffice/store/axios';

export const createMeeting = data => axios.post('/phonghop/create', data).then(res => res.data);
