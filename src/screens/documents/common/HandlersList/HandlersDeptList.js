import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import Checkbox from 'eoffice/components/Checkbox';
import colors from 'eoffice/utils/colors';
import { compareDepartment } from '../../../../utils/utils';

const HandlersDeptList = ({ handlers, onSelect, selected }) => {
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    handlers.sort((a, b) => compareDepartment(a, b));
    setSortData(handlers);
  });

  return (
    <FlatList
      data={sortData}
      extraData={selected}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ flexDirection: 'row', paddingVertical: 12, alignItems: 'center' }}
          onPress={() => {
            onSelect(item.id);
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 1, paddingLeft: 10 }}>
            {item.deptName}
          </Text>
          <Checkbox checked={selected[item.id]} style={{ marginHorizontal: 12 }} />
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: colors.lighterGray, marginLeft: 58 }} />
      )}
    />
  );
};

HandlersDeptList.propTypes = {
  handlers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};
HandlersDeptList.defaultProps = {
  onSelect() {},
  selected: {},
};

export default HandlersDeptList;
