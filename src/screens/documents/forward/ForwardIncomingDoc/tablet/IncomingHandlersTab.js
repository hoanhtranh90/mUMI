import _ from 'lodash';
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';

import { View, Item, Icon, Input, Button, Text } from 'native-base';
import colors from 'eoffice/utils/colors';
import { NavigationEvents } from 'react-navigation';
import { getDeptInGroups } from 'eoffice/store/documents/detail/service';
import { ScrollView } from 'react-native-gesture-handler';
import { GroupedHandlers, GroupedHandlersDept } from '../../../common/HandlersList';
import { DEPT_TYPE, DEPT_TYPE_NAME } from '../../../../../constants/documents';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';

const initialState = {
  chuTri: [],
  phoiHop: [],
  nhanDeBiet: [],
  added: [],
  searchText: null,
  selected: {},
};

const initialStateDept = {
  chuTri: [],
  phoiHop: [],
  nhanDeBiet: [],
  added: [],
  searchText: null,
  selected: {},
};

const styles = StyleSheet.create({
  item: {
    borderColor: colors.lightBlue,
  },
  searchIcon: {
    fontSize: 24,
    color: colors.blue,
  },
  input: {
    height: 40,
    fontSize: 15,
    paddingLeft: 0,
    color: colors.darkGray,
  },
});

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
        _.forEach(action.payload, id => {
          newState.selected[id] = !newState.selected[action.payload[id]];
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
        _.forEach(action.payload, id => {
          newState.selected[id] = !newState.selected[id];
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

const IncomingHandlersTab = ({
  filteredIds,
  filteredIdsDepartment,
  handlersByDept,
  departments,
  onSubmit,
  onSubmitDept,
  canChuyenXuLyDonvi,
  canChuyenXuLy,
  groups,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateDepartment, dispatchDepartment] = useReducer(reducerDept, initialStateDept);
  const [textSearch, setTextSearch] = useState('');
  console.log('canChuyenXuLy', canChuyenXuLy);
  console.log('canChuyenXuLyDonvi', canChuyenXuLyDonvi);
  const add = role =>
    dispatch({ type: 'add', payload: { role, handlers: getSelected(state.selected) } });
  const submit = () => {
    onSubmit({
      ...state,
      chuTri: [...state.chuTri, ...getSelected(state.selected)],
    });
    dispatch({ type: 'reset' });
  };
  state.selected = {};

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
      const arrUsers = [];
      const arrDepts = [];
      users.forEach(user => {
        if (user.type === 'caNhan') {
          const isHas = checkHasIdInHandlers(
            user.userDeptRoleId,
            concatIdUsers(
              getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds)
            )
          );
          if (isHas) {
            arrUsers.push(user.userDeptRoleId);
          }
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
          if (isHas) {
            arrDepts.push(user.departmentId);
          }
        }
      });
      if (arrUsers.length > 0) {
        dispatch({ type: 'toggle', payload: arrUsers });
        add('chuTri');
        submit();
      }
      if (arrDepts.length > 0) {
        dispatchDepartment({ type: 'toggle', payload: arrDepts });
        addDept('chuTri');
        submitDept();
      }
    });
  };

  state.selected = {};
  stateDepartment.selected = {};

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onDidFocus={() => dispatch({ type: 'reset' })} />
      <Item rounded style={styles.item}>
        <Icon name="search" style={styles.searchIcon} />
        <Input
          onChangeText={text => {
            dispatch({ type: 'setSearchText', payload: text.toLowerCase() });
            dispatchDepartment({ type: 'setSearchText', payload: text.toLowerCase() });
            setTextSearch(text.toLowerCase());
          }}
          placeholder="Nhập từ khoá"
          placeholderTextColor={colors.gray}
          returnKeyType="search"
          style={styles.input}
        />
      </Item>
      {groups !== null && groups.length > 0 && (
        <View>
          <FlatList
            data={groups}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Button
                small
                onPress={() => {
                  chooseHashtag(item);
                }}
                style={{
                  backgroundColor: item.colorCode,
                  marginTop: 9,
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>#{item.groupName}</Text>
              </Button>
            )}
          />
        </View>
      )}
      <ScrollView style={{ paddingTop: 20, flex: 1 }}>
        {!canChuyenXuLy && !canChuyenXuLyDonvi && <ListEmptyComponent />}
        {/*{canChuyenXuLy && !canChuyenXuLyDonvi && (*/}
        {/*  <GroupedHandlers*/}
        {/*    handlers={getFilteredHandlers(*/}
        {/*      handlersByDept,*/}
        {/*      state.added,*/}
        {/*      state.searchText,*/}
        {/*      filteredIds*/}
        {/*    )}*/}
        {/*    multiple*/}
        {/*    selected={state.selected}*/}
        {/*    onSelect={ids => {*/}
        {/*      dispatch({ type: 'toggle', payload: ids });*/}
        {/*      add('chuTri');*/}
        {/*      submit();*/}
        {/*      //*/}
        {/*      dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*      dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}

        {/*{!canChuyenXuLy && canChuyenXuLyDonvi && (*/}
        {/*  <GroupedHandlersDept*/}
        {/*    handlers={getFilteredHandlerDepts(*/}
        {/*      departments,*/}
        {/*      stateDepartment.added,*/}
        {/*      stateDepartment.searchText,*/}
        {/*      filteredIdsDepartment*/}
        {/*    )}*/}
        {/*    multiple*/}
        {/*    selected={stateDepartment.selected}*/}
        {/*    onSelect={ids => {*/}
        {/*      dispatchDepartment({ type: 'toggle', payload: ids });*/}
        {/*      addDept('chuTri');*/}
        {/*      submitDept();*/}
        {/*      //*/}
        {/*      dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*      dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}

        {/*{!canChuyenXuLy && !canChuyenXuLyDonvi && <View style={{ backgroundColor: 'green' }} />}*/}

        {/*{canChuyenXuLy &&*/}
        {/*  getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length ===*/}
        {/*    0 &&*/}
        {/*  canChuyenXuLyDonvi &&*/}
        {/*  getFilteredHandlerDepts(*/}
        {/*    departments,*/}
        {/*    stateDepartment.added,*/}
        {/*    stateDepartment.searchText,*/}
        {/*    filteredIdsDepartment*/}
        {/*  ).length === 0 && (*/}
        {/*    <GroupedHandlersDept*/}
        {/*      handlers={getFilteredHandlerDepts(*/}
        {/*        departments,*/}
        {/*        stateDepartment.added,*/}
        {/*        stateDepartment.searchText,*/}
        {/*        filteredIdsDepartment*/}
        {/*      )}*/}
        {/*      multiple*/}
        {/*      selected={stateDepartment.selected}*/}
        {/*      onSelect={ids => {*/}
        {/*        dispatchDepartment({ type: 'toggle', payload: ids });*/}
        {/*        addDept('chuTri');*/}
        {/*        submitDept();*/}
        {/*        //*/}
        {/*        dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*        dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}

        {/*{canChuyenXuLy &&*/}
        {/*  getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length ===*/}
        {/*    0 &&*/}
        {/*  canChuyenXuLyDonvi &&*/}
        {/*  getFilteredHandlerDepts(*/}
        {/*    departments,*/}
        {/*    stateDepartment.added,*/}
        {/*    stateDepartment.searchText,*/}
        {/*    filteredIdsDepartment*/}
        {/*  ).length > 0 && (*/}
        {/*    <GroupedHandlersDept*/}
        {/*      handlers={getFilteredHandlerDepts(*/}
        {/*        departments,*/}
        {/*        stateDepartment.added,*/}
        {/*        stateDepartment.searchText,*/}
        {/*        filteredIdsDepartment*/}
        {/*      )}*/}
        {/*      multiple*/}
        {/*      selected={stateDepartment.selected}*/}
        {/*      onSelect={ids => {*/}
        {/*        dispatchDepartment({ type: 'toggle', payload: ids });*/}
        {/*        addDept('chuTri');*/}
        {/*        submitDept();*/}
        {/*        //*/}
        {/*        dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*        dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}

        {/*{canChuyenXuLy &&*/}
        {/*  getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length >*/}
        {/*    0 &&*/}
        {/*  canChuyenXuLyDonvi &&*/}
        {/*  getFilteredHandlerDepts(*/}
        {/*    departments,*/}
        {/*    stateDepartment.added,*/}
        {/*    stateDepartment.searchText,*/}
        {/*    filteredIdsDepartment*/}
        {/*  ).length === 0 && (*/}
        {/*    <GroupedHandlers*/}
        {/*      handlers={getFilteredHandlers(*/}
        {/*        handlersByDept,*/}
        {/*        state.added,*/}
        {/*        state.searchText,*/}
        {/*        filteredIds*/}
        {/*      )}*/}
        {/*      multiple*/}
        {/*      selected={state.selected}*/}
        {/*      onSelect={ids => {*/}
        {/*        dispatch({ type: 'toggle', payload: ids });*/}
        {/*        add('chuTri');*/}
        {/*        submit();*/}
        {/*        //*/}
        {/*        dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*        dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}
        {canChuyenXuLy && (
          <GroupedHandlers
            handlers={getFilteredHandlers(
              handlersByDept,
              state.added,
              state.searchText,
              filteredIds
            )}
            multiple
            selected={state.selected}
            onSelect={ids => {
              dispatch({ type: 'toggle', payload: ids });
              add('chuTri');
              submit();
              //
              dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });
              dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });
            }}
          />
        )}
        {canChuyenXuLyDonvi && (
          <GroupedHandlersDept
            handlers={getFilteredHandlerDepts(
              departments,
              stateDepartment.added,
              stateDepartment.searchText,
              filteredIdsDepartment
            )}
            multiple
            selected={stateDepartment.selected}
            onSelect={ids => {
              dispatchDepartment({ type: 'toggle', payload: ids });
              addDept('chuTri');
              submitDept();
              //
              dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });
              dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });
            }}
          />
        )}
        {/*{canChuyenXuLy &&*/}
        {/*  getFilteredHandlers(handlersByDept, state.added, state.searchText, filteredIds).length >*/}
        {/*    0 &&*/}
        {/*  canChuyenXuLyDonvi &&*/}
        {/*  getFilteredHandlerDepts(*/}
        {/*    departments,*/}
        {/*    stateDepartment.added,*/}
        {/*    stateDepartment.searchText,*/}
        {/*    filteredIdsDepartment*/}
        {/*  ).length > 0 && (*/}
        {/*    <>*/}
        {/*      <GroupedHandlers*/}
        {/*        handlers={getFilteredHandlers(*/}
        {/*          handlersByDept,*/}
        {/*          state.added,*/}
        {/*          state.searchText,*/}
        {/*          filteredIds*/}
        {/*        )}*/}
        {/*        multiple*/}
        {/*        selected={state.selected}*/}
        {/*        onSelect={ids => {*/}
        {/*          dispatch({ type: 'toggle', payload: ids });*/}
        {/*          add('chuTri');*/}
        {/*          submit();*/}
        {/*          //*/}
        {/*          dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*          dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*        }}*/}
        {/*      />*/}
        {/*      <GroupedHandlersDept*/}
        {/*        handlers={getFilteredHandlerDepts(*/}
        {/*          departments,*/}
        {/*          stateDepartment.added,*/}
        {/*          stateDepartment.searchText,*/}
        {/*          filteredIdsDepartment*/}
        {/*        )}*/}
        {/*        multiple*/}
        {/*        selected={stateDepartment.selected}*/}
        {/*        onSelect={ids => {*/}
        {/*          dispatchDepartment({ type: 'toggle', payload: ids });*/}
        {/*          addDept('chuTri');*/}
        {/*          submitDept();*/}
        {/*          //*/}
        {/*          dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*          dispatchDepartment({ type: 'setSearchText', payload: textSearch.toLowerCase() });*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </>*/}
        {/*  )}*/}
      </ScrollView>
    </View>
  );
};

IncomingHandlersTab.propTypes = {
  handlersByDept: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  filteredIds: PropTypes.instanceOf(Set),
  filteredIdsDepartment: PropTypes.instanceOf(Set),
  departments: PropTypes.arrayOf(PropTypes.shape({})),
  onSubmit: PropTypes.func,
  onSubmitDept: PropTypes.func,
  canChuyenXuLyDonvi: PropTypes.bool,
  canChuyenXuLy: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape()),
};
IncomingHandlersTab.defaultProps = {
  filteredIds: new Set(),
  filteredIdsDepartment: new Set(),
  onSubmit() {},
  onSubmitDept() {},
  departments: [],
  canChuyenXuLyDonvi: true,
  canChuyenXuLy: true,
  groups: [],
};

export default IncomingHandlersTab;
