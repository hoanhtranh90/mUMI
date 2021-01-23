import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import Checkbox from 'eoffice/components/Checkbox';
import colors from 'eoffice/utils/colors';

const reducer = (state, action) => {
  switch (action.type) {
    case 'filter':
      return {
        ...state,
        filtered: state.departments.filter(
          deparment => deparment.deptName.toLowerCase().indexOf(action.payload) >= 0
        ),
      };

    case 'setDept':
      return {
        ...state,
        departments: action.payload,
        filtered: action.payload,
      };

    case 'toggle':
      if (state.selected.has(action.payload)) {
        state.selected.delete(action.payload);
      } else {
        state.selected.add(action.payload);
      }
      return { ...state };

    default:
      return state;
  }
};

const DepartmentSelectModal = ({ departments, isVisible, onClose, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, {
    departments,
    selected: new Set(),
    filtered: departments,
  });
  const submit = () => {
    onSubmit([...state.selected]);
    onClose();
  };

  useEffect(
    () => {
      dispatch({ type: 'setDept', payload: departments });
    },
    [departments]
  );

  return (
    <ModalWithFilter
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={submit}
      onSearch={txt => dispatch({ type: 'filter', payload: txt.toLowerCase() })}
    >
      <FlatList
        data={state.filtered}
        extraData={state.selected}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => dispatch({ type: 'toggle', payload: item.id })}
            style={{ flexDirection: 'row', paddingVertical: 12, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1 }}>{item.deptName}</Text>
            <Checkbox checked={state.selected.has(item.id)} style={{ marginHorizontal: 12 }} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.lighterGray }} />
        )}
      />
    </ModalWithFilter>
  );
};

DepartmentSelectModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  departments: PropTypes.arrayOf(PropTypes.shape({})),
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
DepartmentSelectModal.defaultProps = {
  departments: [],
  isVisible: false,
  onClose() {},
};

export default DepartmentSelectModal;
