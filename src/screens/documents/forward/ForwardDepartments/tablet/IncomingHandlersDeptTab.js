import _ from 'lodash';
import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { View, Item, Icon, Input } from 'native-base';
import colors from 'eoffice/utils/colors';
import { DEPT_TYPE, DEPT_TYPE_NAME } from '../../../../../constants/documents';
import { GroupedHandlersDept } from '../../../common/HandlersList';

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
  console.log(handlers);
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

const IncomingHandlersTab = ({ departments, filteredIds, onSubmit, isGroupUsers, searchText }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [textSearch, setTextSearch] = useState('');

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
  useEffect(
    () => {
      if (searchText !== '') {
        dispatch({ type: 'setSearchText', payload: searchText.toLowerCase() });
        setTextSearch(searchText.toLowerCase());
      }
    },
    [searchText]
  );

  state.selected = {};
  return (
    <View style={{ flex: 1 }}>
      {isGroupUsers !== true && (
        <Item rounded style={styles.item}>
          <Icon name="search" style={styles.searchIcon} />
          <Input
            onChangeText={text => {
              dispatch({ type: 'setSearchText', payload: text.toLowerCase() });
              setTextSearch(text.toLowerCase());
            }}
            placeholder="Nhập từ khoá"
            placeholderTextColor={colors.gray}
            returnKeyType="search"
            value={textSearch}
            style={styles.input}
          />
        </Item>
      )}
      <View style={{ paddingTop: 20, flex: 1 }}>
        <GroupedHandlersDept
          handlers={getFilteredHandlers(departments, state.added, state.searchText, filteredIds)}
          multiple
          selected={state.selected}
          onSelect={ids => {
            dispatch({ type: 'toggle', payload: ids });
            add('chuTri');
            submit();
            //
            dispatch({ type: 'setSearchText', payload: textSearch.toLowerCase() });
          }}
        />
      </View>
    </View>
  );
};

IncomingHandlersTab.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredIds: PropTypes.instanceOf(Set),
  onSubmit: PropTypes.func,
  isGroupUsers: PropTypes.bool,
  searchText: PropTypes.string,
};

IncomingHandlersTab.defaultProps = {
  filteredIds: new Set(),
  isGroupUsers: false,
  onSubmit() {},
  searchText: '',
};

export default IncomingHandlersTab;
