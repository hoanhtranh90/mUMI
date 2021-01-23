import _ from 'lodash';
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { ScrollView, FlatList } from 'react-native';
import { View, Text, Button } from 'native-base';
import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import { getDeptInGroups } from 'eoffice/store/documents/detail/service';
import { NavigationEvents } from 'react-navigation';
import { GroupedHandlers, GroupedHandlersDept } from '../../common/HandlersList';
import RoleSelectButtons from './RoleSelectButtons';
import { DEPT_TYPE, DEPT_TYPE_NAME } from '../../../../constants/documents';

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
  filteredIdsDepartment,
  handlersByDept,
  departments,
  isVisible,
  onClose,
  onSubmit,
  onSubmitDept,
  canChuyenXuLyDonvi,
  groups,
  canChuyenXuLy,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [stateDepartment, dispatchDepartment] = useReducer(reducerDept, initialStateDept);

  const add = role => {
    const selected = getSelected(state.selected);
    const arrAdd = [];
    selected.forEach(select => {
      let found = false;
      for (let i = 0; i < state.added.length; i += 1) {
        if (state.added[i] === select) {
          found = true;
          break;
        }
      }
      if (found === false) arrAdd.push(select);
    });
    //
    dispatch({ type: 'add', payload: { role, handlers: arrAdd } });
  };
  const submit = () => {
    onSubmit({
      ...state,
      chuTri: [...state.chuTri, ...getSelected(state.selected)],
    });
    dispatch({ type: 'reset' });
  };

  const addDept = role => {
    const selected = getSelected(stateDepartment.selected);
    const arrAdd = [];
    selected.forEach(select => {
      let found = false;
      for (let i = 0; i < stateDepartment.added.length; i += 1) {
        if (stateDepartment.added[i] === select) {
          found = true;
          break;
        }
      }
      if (found === false) arrAdd.push(select);
    });
    //
    dispatchDepartment({
      type: 'add',
      payload: { role, handlers: arrAdd },
    });
  };
  const submitDept = () => {
    onSubmitDept({
      ...stateDepartment,
      chuTri: [...stateDepartment.chuTri, ...getSelectedDept(stateDepartment.selected)],
    });
    dispatchDepartment({ type: 'reset' });
  };
  const checkHasIdInHandlers = (id, vendors) => {
    let found = false;
    for (let i = 0; i < vendors.length; i += 1) {
      if (vendors[i].id === id) {
        found = true;
        break;
      }
    }
    return found;
  };

  const concatIdDepts = handlers => {
    const arrHandlers = [];
    handlers.forEach(ele => {
      if (ele.children.length > 0) {
        for (let i = 0; i < ele.children.length; i += 1) {
          arrHandlers.push(ele.children[i]);
        }
      }
    });
    return arrHandlers;
  };

  const concatIdUsers = handlers => {
    const arrHandlers = [];
    handlers.forEach(ele => {
      for (let i = 0; i < ele.children.length; i += 1) {
        arrHandlers.push(ele.children[i]);
      }
    });
    return arrHandlers;
  };

  const chooseHashtag = group => {
    getDeptInGroups(group.id).then(res => {
      const users = res.data;
      users.forEach(user => {
        if (user.type === 'caNhan') {
          const isHas = checkHasIdInHandlers(
            user.userDeptRoleId,
            concatIdUsers(
              getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds)
            )
          );
          if (isHas) dispatch({ type: 'toggle', payload: user.userDeptRoleId });
        } else if (user.type === 'donVi') {
          const isHas = checkHasIdInHandlers(
            user.departmentId,
            concatIdDepts(
              getFilteredHandlerDepts(
                departments,
                stateDepartment.added,
                stateDepartment.searchText,
                filteredIdsDepartment
              )
            )
          );
          if (isHas) dispatchDepartment({ type: 'toggle', payload: user.departmentId });
        }
      });
    });
  };

  return (
    <>
      <NavigationEvents
        onDidFocus={() => {
          dispatch({ type: 'reset' });
          dispatchDepartment({ type: 'reset' });
        }}
      />
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
        {/*{groups !== null && groups.length > 0 && (*/}
        {/*  <View>*/}
        {/*    <FlatList*/}
        {/*      data={groups}*/}
        {/*      horizontal*/}
        {/*      keyExtractor={(item, index) => index.toString()}*/}
        {/*      renderItem={({ item }) => (*/}
        {/*        <Button*/}
        {/*          small*/}
        {/*          onPress={() => {*/}
        {/*            chooseHashtag(item);*/}
        {/*          }}*/}
        {/*          style={{*/}
        {/*            backgroundColor: item.colorCode,*/}
        {/*            marginBottom: 9,*/}
        {/*            paddingHorizontal: 7,*/}
        {/*            paddingVertical: 10,*/}
        {/*            marginHorizontal: 5,*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>#{item.groupName}</Text>*/}
        {/*        </Button>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </View>*/}
        {/*)}*/}
        <ScrollView>
          {canChuyenXuLy && !canChuyenXuLyDonvi && (
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
          )}

          {!canChuyenXuLy && canChuyenXuLyDonvi && (
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

          {canChuyenXuLy &&
            getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds)
              .length === 0 &&
            canChuyenXuLyDonvi &&
            getFilteredHandlerDepts(
              departments,
              stateDepartment.added,
              stateDepartment.searchText,
              filteredIdsDepartment
            ).length === 0 && (
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

          {canChuyenXuLy &&
            getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds)
              .length === 0 &&
            canChuyenXuLyDonvi &&
            getFilteredHandlerDepts(
              departments,
              stateDepartment.added,
              stateDepartment.searchText,
              filteredIdsDepartment
            ).length > 0 && (
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

          {canChuyenXuLy &&
            getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length >
              0 &&
            canChuyenXuLyDonvi &&
            getFilteredHandlerDepts(
              departments,
              stateDepartment.added,
              stateDepartment.searchText,
              filteredIdsDepartment
            ).length === 0 && (
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
            )}
          {canChuyenXuLy &&
            getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length >
              0 &&
            canChuyenXuLyDonvi &&
            getFilteredHandlerDepts(
              departments,
              stateDepartment.added,
              stateDepartment.searchText,
              filteredIdsDepartment
            ).length > 0 && (
              <>
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
              </>
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
  onSubmit: PropTypes.func,
  onSubmitDept: PropTypes.func,
  canChuyenXuLyDonvi: PropTypes.bool,
  canChuyenXuLy: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape()),
};
IncomingHandlersModal.defaultProps = {
  filteredIds: new Set(),
  filteredIdsDepartment: new Set(),
  isVisible: false,
  onClose() {},
  onSubmit() {},
  onSubmitDept() {},
  departments: [],
  canChuyenXuLyDonvi: true,
  canChuyenXuLy: true,
  groups: [],
};

export default IncomingHandlersModal;
