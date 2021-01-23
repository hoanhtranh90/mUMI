import { useReducer } from 'react';
import {
  HC_CASE_CALENDAR
} from 'eoffice/constants/administrative';

const initialState = {
  title: '',
  content: '',
  startDate: null,
  endDate: null,
  place: '',
  listLanhDao: [],
  leaders: [],
  listCT: [],
  listPH: [],
  participant: '',
  chaired: '',
  videoc: '',
  roomName: null,
  rqMores: 0,
  meetingType : HC_CASE_CALENDAR.MEETING_TYPE.ONLINE
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
