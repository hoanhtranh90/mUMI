import _ from 'lodash';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import HandlersList from '../../common/HandlersList';

const initialState = {
  selected: {},
  searchText: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        selected: {
          [action.payload]: true,
        },
      };

    case 'search':
      return action.payload === state.searchText
        ? state
        : {
            ...state,
            searchText: action.payload,
          };

    default:
      return state;
  }
};

const HandlerSelectModal = ({ handlers, isVisible, onClose, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const submit = () => {
    const selected = Object.keys(state.selected);
    if (selected.length) {
      onSubmit(selected[0]);
      onClose();
    }
  };

  const list = state.searchText
    ? _.filter(handlers, handler => _.includes(handler.fullName.toLowerCase(), state.searchText))
    : handlers;
  return (
    <ModalWithFilter
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={submit}
      onSearch={text => dispatch({ type: 'search', payload: text.toLowerCase() })}
    >
      <HandlersList
        handlers={list}
        onSelect={id => dispatch({ type: 'select', payload: id })}
        selected={state.selected}
      />
    </ModalWithFilter>
  );
};

HandlerSelectModal.propTypes = {
  handlers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,

  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
HandlerSelectModal.defaultProps = {
  isVisible: false,
  onClose() {},
};

export default HandlerSelectModal;
