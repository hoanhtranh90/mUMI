import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useReducer, useEffect } from 'react';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import { NavigationEvents } from 'react-navigation';
import { GroupedHandlers } from '../common/HandlersList';

const initialState = {
  users: [],
  added: [],
  searchText: null,
  selected: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.payload.role]: [...state[action.payload.role], ...action.payload.handlers],
        added: [...state.added, ...action.payload.handlers],
        selected: {},
      };

    case 'toggle': {
      const newState = { ...state };
      if (_.isArray(action.payload)) {
        const current = newState.selected[action.payload[0]];
        _.forEach(action.payload, id => {
          newState.selected[id] = !current;
        });
      } else {
        newState.selected[action.payload] = !newState.selected[action.payload];
      }
      return newState;
    }

    case 'setSearchText':
      return action.payload === state.searchText ? state : { ...state, searchText: action.payload };

    case 'reset':
      return { ...initialState, selected: {} };

    default:
      return state;
  }
};

const getFilteredHandlers = (handlers, filtered, searchText, filteredIds) => {
  const deptWithUserFiltered = handlers.map(dept => ({
    ...dept,
    children: dept.children.filter(user => {
      if (filtered.indexOf(user.id) >= 0 || filteredIds.has(user.id)) {
        return false;
      }

      if (searchText) {
        return _.includes(user.fullName.toLowerCase(), searchText);
      }

      return true;
    }),
  }));
  return deptWithUserFiltered.filter(dept => dept.children.length);
};

const getSelected = selected => Object.keys(selected).filter(k => selected[k]);

const CCHandlersModal = ({ onClose, onSubmit, isVisible, handlersByDept, filteredIds }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const submit = () => {
    onSubmit({ ...state, users: [...state.users, ...getSelected(state.selected)] });
    dispatch({ type: 'reset' });
    onClose();
  };
  useEffect(
    () => () => {
      state.selected = {};
      dispatch({ type: 'reset' });
    },
    []
  );
  return (
    <>
      <NavigationEvents onDidFocus={() => dispatch({ type: 'reset' })} />
      <ModalWithFilter
        isVisible={isVisible}
        onClose={onClose}
        onSearch={text => dispatch({ type: 'setSearchText', payload: text.toLowerCase() })}
        onSubmit={submit}
      >
        <GroupedHandlers
          handlers={getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds)}
          multiple
          selected={state.selected}
          onSelect={ids => dispatch({ type: 'toggle', payload: ids })}
        />
      </ModalWithFilter>
    </>
  );
};

CCHandlersModal.propTypes = {
  handlersByDept: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  filteredIds: PropTypes.instanceOf(Set),
  onSubmit: PropTypes.func,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

CCHandlersModal.defaultProps = {
  filteredIds: new Set(),
  isVisible: false,
  onClose() {},
  onSubmit() {},
};

export default CCHandlersModal;
