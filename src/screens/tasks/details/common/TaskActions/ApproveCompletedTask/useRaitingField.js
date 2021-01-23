import { useReducer } from 'react';

const initialState = {
  status: null,
  textColor: null,
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

export default function useRaitingField() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setValue(field, value) {
      dispatch({
        type: 'setValue',
        payload: { field, value },
      });
    },
  };
  return [state, actions];
}
