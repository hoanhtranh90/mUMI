import axios from 'eoffice/store/axios';

const flowService = {
  findById(id) {
    return axios.get('vbFlow/' + id);
  },
};

export default flowService;
