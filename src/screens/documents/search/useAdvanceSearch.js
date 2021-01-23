import { DOC_USER_STATUS } from 'eoffice/constants/documents';
import { useReducer } from 'react';
import filters from '../../../utils/quick-filters';

const docDateMonthFilter = filters.find(filter => filter.id === 'docDateMonthAgo');

const initialState = {
  usingAdvanceSearch: 1,
  // share
  fileContent: undefined,
  docCode: undefined,
  quote: undefined,
  docTypeId: undefined,
  publisherId: undefined,
  docDate: [],
  // vb den
  outsidePublisherName: undefined,
  incomingDate: [],
  vbDocUserUpdateTime: [],
  // vb di
  priorityId: undefined,
  processTime: [],
  createTime: [],
  receiveDeptId: undefined,
  otherReceivePlaces: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case 'reset':
      return {
        ...action.payload,
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
    reset(type) {
      dispatch({
        type: 'reset',
        payload: { ...initialState, docDate: docDateMonthFilter.getValue(), createTime: docDateMonthFilter.getValue() },
      });
    },
  };

  return [state, actions];
}
