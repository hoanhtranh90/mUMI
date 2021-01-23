import _ from 'lodash';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { GroupedHandlers, GroupedHandlersDept } from '../common/HandlersList';
import RoleSelectButtons from '../common/RoleSelectButtons';
import { DEPT_TYPE, DEPT_TYPE_NAME } from '../../../constants/documents';

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
const initialStateDept = {
  chuTri: [],
  phoiHop: [],
  nhanDeBiet: [],
  added: [],
  searchText: null,
  selected: {},
};

const reducerDept = (state, action) => {
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

const getFilteredHandlerDepts = (handlers, filtered, searchText, filteredIds) => {
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

const getSelectedDept = selected => Object.keys(selected).filter(k => selected[k]);

const IncomingHandlersModal = ({
  filteredIds,
  handlersByDept,
  isVisible,
  onClose,
  onSubmit,
  onSubmitDept,
  departments,
  filteredIdsDepartment,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateDepartment, dispatchDepartment] = useReducer(reducerDept, initialStateDept);

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

  const addDept = role =>
    dispatchDepartment({
      type: 'add',
      payload: { role, handlers: getSelectedDept(stateDepartment.selected) },
    });
  const submitDept = () => {
    onSubmitDept({
      ...stateDepartment,
      chuTri: [...stateDepartment.chuTri, ...getSelectedDept(stateDepartment.selected)],
    });
    dispatchDepartment({ type: 'reset' });
  };

  return (
    <>
      <NavigationEvents onDidFocus={() => dispatch({ type: 'reset' })} />
      <ModalWithFilter
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={() => {
          submit();
          submitDept();
          onClose();
        }}
        onSearch={text => {
          dispatch({ type: 'setSearchText', payload: text.toLowerCase() });
          dispatchDepartment({ type: 'setSearchText', payload: text.toLowerCase() });
        }}
        ExtraActions={
          <RoleSelectButtons
            onPress={role => {
              add(role);
              addDept(role);
            }}
            state={state}
            stateDept={stateDepartment}
          />
        }
      >
        <ScrollView style={{ paddingTop: 20, flex: 1 }}>
          <GroupedHandlers
            handlers={getFilteredHandlers(
              handlersByDept,
              state.added,
              state.searchText,
              filteredIds
            )}
            multiple
            selected={state.selected}
            onSelect={ids => dispatch({ type: 'toggle', payload: ids })}
          />
          {departments.length > 0 && (
            <GroupedHandlersDept
              handlers={getFilteredHandlerDepts(
                departments,
                stateDepartment.added,
                stateDepartment.searchText,
                filteredIdsDepartment
              )}
              multiple
              selected={stateDepartment.selected}
              onSelect={ids => dispatchDepartment({ type: 'toggle', payload: ids })}
            />
          )}
        </ScrollView>
      </ModalWithFilter>
    </>
  );
};

IncomingHandlersModal.propTypes = {
  handlersByDept: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  filteredIds: PropTypes.instanceOf(Set),
  filteredIdsDepartment: PropTypes.instanceOf(Set),
  departments: PropTypes.arrayOf(PropTypes.shape({})),
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmitDept: PropTypes.func,
  onSubmit: PropTypes.func,
};
IncomingHandlersModal.defaultProps = {
  filteredIds: new Set(),
  isVisible: false,
  onSubmitDept() {},
  filteredIdsDepartment: new Set(),
  departments: [],
  onClose() {},
  onSubmit() {},
};

export default IncomingHandlersModal;
