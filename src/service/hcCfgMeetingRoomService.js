import axios from 'eoffice/store/axios';
import utils from "./utils";

export default {
  findById(id) {
    return axios.get(`/meetingRoom/${id}`).then(res => res.data);
  },

  findAll(form, pageable) {
    pageable = utils.initPageableParams(pageable);
    let params = utils.merge(form, pageable);
    return axios.get(`/meetingRoom/`, {params: params}).then(res => res.data);
  }
}
