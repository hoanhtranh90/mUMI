import axios from 'eoffice/store/axios';

export const createVeMayBay = data => axios.post('/vemaybay/create', data).then(res => res);
