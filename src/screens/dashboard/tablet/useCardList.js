import { useReducer } from 'react';

const initialState = {
  count: 0,
  countNew: 0,
  list: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return {
        ...action.payload,
        loading: false,
      };

    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default function (loadData) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    async init() {
      if (!loadData) {
        dispatch({ type: 'setLoading', payload: false });
        return;
      }

      dispatch({ type: 'setLoading', payload: true });
      const data = await loadData();
      dispatch({ type: 'loaded', payload: data });
    },
  };

  return [state, actions];
}
