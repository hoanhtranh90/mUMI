import _ from 'lodash';
import { useReducer } from 'react';

const initialState = {
  multyMode: false,
  doc: [],
  stepId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      const newState = { ...state };
      if (_.isArray(action.payload)) {
        const current = newState.doc[action.payload[0]];
        _.forEach(action.payload, id => {
          newState.doc[id] = current;
        });
      } else {
        newState.doc[action.payload] = !newState.doc[action.payload];
      }

      return newState;
    }

    case 'setMultyMode': {
      const newState = {
        ...state,
        multyMode: action.payload.multyMode,
        stepId: action.payload.stepId,
      };
      return {
        ...newState,
      };
    }

    case 'reset':
      return { ...initialState, doc: {} };
    default:
      return state;
  }
};

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    selectedCheckBox(doc) {
      dispatch({ type: 'toggle', payload: doc });
    },

    openMultyMode(stepId) {
      if (stepId !== state.stepId) {
        dispatch({ type: 'reset' });
      }
      dispatch({ type: 'setMultyMode', payload: { multyMode: true, stepId } });
    },
    closeMultyMode() {
      dispatch({ type: 'reset' });
    },
  };
  return [state, actions];
}
