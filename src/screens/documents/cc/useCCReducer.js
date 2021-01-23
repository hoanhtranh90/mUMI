import { useReducer } from 'react';

const initialState = {
  users: new Set(),
  note: null,
  valid: false,
};

const isValid = state => state.users.size > 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const newState = {
        note: state.note,
        users: new Set([...state.users, ...action.payload.users]),
      };
      return {
        ...newState,
        valid: isValid(newState),
      };
    }

    case 'remove': {
      state.users.delete(action.payload.id);
      state[action.payload.role].delete(action.payload.id);
      const valid = isValid(state);
      return {
        ...state,
        valid,
      };
    }

    case 'setNote': {
      const newState = {
        ...state,
        note: action.payload,
      };
      const valid = isValid(state);
      return {
        ...newState,
        valid,
      };
    }

    default:
      return state;
  }
};

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    addHandlers(selectedHandlers) {
      dispatch({ type: 'add', payload: selectedHandlers });
    },
    remove(id, role) {
      dispatch({ type: 'remove', payload: { id, role } });
    },
    setNote(note) {
      dispatch({ type: 'setNote', payload: note });
    },
  };

  return [state, actions];
}
