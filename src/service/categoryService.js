import axios from 'eoffice/store/axios';

const categoryService = {
  findById(id) {
    return axios.get("category/" + id)
  }
}

export default categoryService
