import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import DepartmentDeptRow from './DepartmentDeptRow';

const GroupedDeptHandlers = ({ handlers, multiple, onSelect, selected }) => (
  <FlatList
    data={handlers}
    extraData={selected}
    style={{
      paddingVertical: 15,
    }}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <DepartmentDeptRow
        key={`${item.id}`}
        {...item}
        headerSelect={multiple}
        onSelect={onSelect}
        selected={selected}
      />
    )}
    // ListEmptyComponent={<ListEmptyComponent />}
    scrollEnabled={false}
  />
);

GroupedDeptHandlers.propTypes = {
  handlers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};
GroupedDeptHandlers.defaultProps = {
  multiple: false,
  onSelect() {},
  selected: {},
};

export default GroupedDeptHandlers;
