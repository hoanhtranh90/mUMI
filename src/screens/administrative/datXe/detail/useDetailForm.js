import { useReducer } from 'react';
import { REQUEST_TYPE } from 'eoffice/constants/administrative';

const initialState = {
  title: undefined,
  content: undefined,
  startTime: null,
  endTime: null,
  fromPlace: undefined,
  toPlace: undefined,
  numberOfPeople: undefined,
  contactNumber: undefined,
  requestType: REQUEST_TYPE[0],
  carAndDriverSelected: [],
  note: undefined,
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

export default function useCreateForm() {
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const actions = {
    setValue(field, value) {
      dispatch({ type: 'setValue', payload: { field, value } });
    },
  };

  return [state, actions];
}
