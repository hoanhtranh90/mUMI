import { useReducer } from 'react';

const initialState = {
  usingAdvanceSearch: 1,
  // description
  taskTitle: undefined,
  taskDetail: undefined,
  //  date
  deadline: [],
  // user assign
  assignerUserDeptRole: undefined,
  // user receive
  receiverUserDeptRole: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    default:
      return state;
  }
}

export default function useAdvanceSearch(defaultQuery) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...defaultQuery });

  const actions = {
    setValue(field, value) {
      dispatch({ type: 'setValue', payload: { field, value } });
    },
  };

  return [state, actions];
}
