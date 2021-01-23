import { useReducer } from 'react';

const initialState = {
  docFinish: [],
  docFinished: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        [action.payload.field]: [...state[action.payload.field], action.payload.doc],
      };
    }
    default:
      return state;
  }
};

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    addStatus(doc, field) {
      dispatch({ type: 'add', payload: { field, doc } });
    },
  };

  return [state, actions];
}
