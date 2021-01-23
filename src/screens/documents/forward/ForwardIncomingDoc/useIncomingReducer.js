import { useReducer } from 'react';

const initialState = {
  chuTri: new Set(),
  phoiHop: new Set(),
  nhanDeBiet: new Set(),
  all: new Set(),
  note: null,
  valid: false,
};

const isValid = state =>
  state.chuTri.size > 0 || state.phoiHop.size > 0 || state.nhanDeBiet.size > 0;

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const newState = {
        note: state.note,
        chuTri: new Set([...state.chuTri, ...action.payload.chuTri]),
        phoiHop: new Set([...state.phoiHop, ...action.payload.phoiHop]),
        nhanDeBiet: new Set([...state.nhanDeBiet, ...action.payload.nhanDeBiet]),
        all: new Set([
          ...state.all,
          ...action.payload.chuTri,
          ...action.payload.phoiHop,
          ...action.payload.nhanDeBiet,
        ]),
      };
      return {
        ...newState,
        valid: isValid(newState),
      };
    }

    case 'remove': {
      state.all.delete(action.payload.id);
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

    case 'changeRole': {
      if (state.chuTri.has(action.payload.id)) {
        state.chuTri.delete(action.payload.id);
      } else if (state.phoiHop.has(action.payload.id)) {
        state.phoiHop.delete(action.payload.id);
      } else if (state.nhanDeBiet.has(action.payload.id)) {
        state.nhanDeBiet.delete(action.payload.id);
      }
      state[action.payload.role].add(action.payload.id);
      const valid = isValid(state);
      return {
        ...state,
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
    changeRole(id, role) {
      dispatch({ type: 'changeRole', payload: { id, role } });
    },
  };

  return [state, actions];
}
