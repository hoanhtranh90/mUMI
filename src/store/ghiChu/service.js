import axios from 'eoffice/store/axios';
import { formatQuery } from 'eoffice/utils/utils';

export const getAllNote = query =>
  axios.get(`/notes`, {params: query}).then(res => {
    return res.data;
  });

export const createNote = form   =>
  axios.post(`/notes`, form).then(res => {
    return res.data;
  });

export const editNote = (id, form) =>
  axios.put(`/notes/${id}`, form).then(res => {
    return res.data;
  });
export const deleteNote = (id) =>
  axios.delete(`/notes/${id}`).then(res => {
    return res.data;
  });
