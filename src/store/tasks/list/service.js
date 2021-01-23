import { TASK_TYPES } from 'eoffice/constants/tasks';
import { formatQuery } from 'eoffice/utils/utils';
import axios from '../../axios';

export const listAssignedTasks = query =>
  axios
    .get('/tkTaskView/taskAssigned', { params: formatQuery(query) })
    .then(res => res.data.map(task => ({ ...task, type: TASK_TYPES.ASSIGNED })));

export const countAssignedTasks = query =>
  axios.get('/tkTaskView/taskAssigned/count', { params: formatQuery(query) }).then(res => res.data);

export const listReceivedTasks = query =>
  axios
    .get('/tkTaskView/taskReceived', { params: formatQuery(query) })
    .then(res => res.data.map(task => ({ ...task, type: TASK_TYPES.RECEIVED })));

export const countReceivedTasks = query =>
  axios.get('/tkTaskView/taskReceived/count', { params: formatQuery(query) }).then(res => res.data);
