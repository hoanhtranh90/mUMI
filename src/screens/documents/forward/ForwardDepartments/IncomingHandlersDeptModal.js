import _ from 'lodash';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import { NavigationEvents } from 'react-navigation';
import { DEPT_TYPE, DEPT_TYPE_NAME } from '../../../../constants/documents';
import { GroupedHandlersDept } from '../../common/HandlersList';
import RoleSelectButtons from './RoleSelectButtons';

const initialState = {
  chuTri: [],
  phoiHop: [],
  nhanDeBiet: [],
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
      return action.payload === state.searchText
        ? state
        : {
            ...state,
            searchText: action.payload,
          };

    case 'reset':
      return { ...initialState, selected: {} };

    default:
      return state;
  }
};

const getFilteredHandlers = (handlers, filtered, searchText, filteredIds) => {
  const deptParents = [
    {
      id: DEPT_TYPE.PB_CN,
      name: DEPT_TYPE_NAME[DEPT_TYPE.PB_CN],
      children: handlers.filter(dept => dept.deptType === DEPT_TYPE.PB_CN),
    },
    {
      id: DEPT_TYPE.DV_TT,
      name: DEPT_TYPE_NAME[DEPT_TYPE.DV_TT],
      children: handlers.filter(dept => dept.deptType === DEPT_TYPE.DV_TT),
    },
    {
      id: DEPT_TYPE.DVK,
      name: DEPT_TYPE_NAME[DEPT_TYPE.DVK],
      children: handlers.filter(
        dept => dept.deptType !== DEPT_TYPE.PB_CN && dept.deptType !== DEPT_TYPE.DV_TT
      ),
    },
  ];
  const deptWithUserFiltered = deptParents.map(deptParent => ({
    ...deptParent,
    children: deptParent.children.filter(dept => {
      if (filtered.indexOf(dept.id) >= 0 || filteredIds.has(dept.id)) {
        return false;
      }
      if (searchText) {
        return _.includes(dept.deptName.toLowerCase(), searchText);
      }
      return true;
    }),
  }));

  return deptWithUserFiltered.filter(dept => dept.children.length);
};

const getSelected = selected => Object.keys(selected).filter(k => selected[k]);

const IncomingHandlersModal = ({ filteredIds, departments, isVisible, onClose, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = role =>
    dispatch({ type: 'add', payload: { role, handlers: getSelected(state.selected) } });
  const submit = () => {
    onSubmit({
      ...state,
      chuTri: [...state.chuTri, ...getSelected(state.selected)],
    });
    dispatch({ type: 'reset' });
    onClose();
  };

  return (
    <>
      <NavigationEvents onDidFocus={() => dispatch({ type: 'reset' })} />
      <ModalWithFilter
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={submit}
        onSearch={text => dispatch({ type: 'setSearchText', payload: text.toLowerCase() })}
        ExtraActions={<RoleSelectButtons onPress={add} state={state} />}
      >
        <GroupedHandlersDept
          handlers={getFilteredHandlers(departments, state.added, state.searchText, filteredIds)}
          multiple
          selected={state.selected}
          onSelect={ids => dispatch({ type: 'toggle', payload: ids })}
        />
      </ModalWithFilter>
    </>
  );
};

IncomingHandlersModal.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredIds: PropTypes.instanceOf(Set),
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
IncomingHandlersModal.defaultProps = {
  filteredIds: new Set(),
  isVisible: false,
  onClose() {},
  onSubmit() {},
};

export default IncomingHandlersModal;
