import { useReducer } from 'react';

import { listIncomingProcesses } from 'eoffice/store/documents/detail/service';

const getInitialState = selected => ({
  loading: true,
  processes: selected || [],
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        loading: false,
        processes: action.payload,
      };

    case 'toggle':
      return {
        ...state,
        processes: state.processes.map(process => {
          if (process.id === action.payload) {
            // eslint-disable-next-line no-param-reassign
            process.selected = !process.selected;
          }
          return process;
        }),
      };

    default:
      return state;
  }
};

export default function(selected) {
  const [state, dispatch] = useReducer(reducer, getInitialState(selected));

  const actions = {
    async loadData(processId) {
      const processes = await listIncomingProcesses({
        parentId: processId,
        page: 0,
        size: 1000,
        order: 'updateTime,desc',
      });

      dispatch({ type: 'loaded', payload: processes });
    },
    toggle(id) {
      dispatch({ type: 'toggle', payload: id });
    },
  };

  return [state, actions];
}
