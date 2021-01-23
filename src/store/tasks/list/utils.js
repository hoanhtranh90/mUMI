import _ from 'lodash';
import { TASK_FILTERS } from '../../../constants/tasks';

export const transformQuery = query => {
  if (!query.taskStatusFilter || query.taskStatusFilter.length == 5) {
    return query;
  }

  const { taskStatusFilter, ...rest } = query;
  const filter = _.find(TASK_FILTERS, ['value', taskStatusFilter]);
  return {
    ...rest,
    taskStatuses: filter.status,
  };
};
