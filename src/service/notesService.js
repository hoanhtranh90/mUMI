import axios from 'eoffice/store/axios';

export const findByHcCalendar = caseMasterId =>
  axios.get('/notes/findByHcCalendar', { params: { caseMasterId } }).then(res => res.data);

export const findAll = query => axios.get('/notes', { params: { ...query } }).then(res => res.data);

export const findById = id => axios.get(`/notes/${id}`).then(res => res.data);

export const deleteNote = id => axios.delete(`/notes/${id}`).then(res => res.data);

export const insertNote = form => axios.post(`/notes`, form).then(res => res.data);

export const editNote = (id, form) => axios.put(`/notes/${id}`, form).then(res => res.data);

export const share = (id, form) =>
  axios.post(`/notes/${id}/share`, form).then(res => {
    return res.data;
  });
