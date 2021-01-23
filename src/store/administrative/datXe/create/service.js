import axios from 'eoffice/store/axios';

export const createDieuXe = data => axios.post('/dieuxe/create', data).then(res => res.data);
