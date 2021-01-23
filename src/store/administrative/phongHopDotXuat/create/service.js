import axios from 'eoffice/store/axios';

export const createMeeting = data => axios.post('/phonghop/createDx', data).then(res => res.data);
