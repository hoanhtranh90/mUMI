import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import DepartmentRow from './DepartmentRow';

const GroupedHandlers = ({ handlers, multiple, onSelect, selected }) => {
  return (
    <FlatList
      data={handlers}
      extraData={selected}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <DepartmentRow
          key={`${item.id}`}
          {...item}
          headerSelect={multiple}
          onSelect={onSelect}
          selected={selected}
        />
      )}
      // ListEmptyComponent={<ListEmptyComponent />}
      scrollEnabled={true}
    />
  );
};

GroupedHandlers.propTypes = {
  handlers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};
GroupedHandlers.defaultProps = {
  multiple: false,
  onSelect() {},
  selected: {},
};

export default GroupedHandlers;
