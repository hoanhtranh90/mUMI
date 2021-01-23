import axios from 'eoffice/store/axios';

const departmentService = {
  findById(id) {
    return axios.get("department/" + id)
  }
}

export default departmentService
