import { useReducer } from 'react';

const initialState = {
  requestName: '',
  requestContent: '',
  flightUserList: [],
  flightRouteList: [],
  flightFileList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }
    case 'reset':
      return {
        requestName: '',
        requestContent: '',
        flightUserList: [],
        flightRouteList: [],
        flightFileList: [],
      }
    default:
      return state;
  }
}

export default function useCreateForm() {
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const actions = {
    setValue(field, value) {
      dispatch({ type: 'setValue', payload: { field, value } });
    },
    reset() {
      dispatch({ type: 'reset' });
    }
  };

  return [state, actions];
}
