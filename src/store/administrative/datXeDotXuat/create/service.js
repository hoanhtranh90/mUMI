import axios from 'eoffice/store/axios';

export const createDieuXeDX = data => axios.post('/dieuxe/createDx', data).then(res => res.data);
