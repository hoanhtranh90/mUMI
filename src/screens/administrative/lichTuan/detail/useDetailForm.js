import { useReducer } from 'react';

const initialState = {
  title: undefined,
  content: undefined,
  startDate: null,
  endDate: null,
  place: undefined,
  listLanhDao: [],
  leaders: [],
  listCT: [],
  listPH: [],
  participant: undefined,
  chaired: undefined,
  videoc: undefined,
  room: null,
  newRoom: null,
  // roomName: null,
  rqMores: 0,
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
