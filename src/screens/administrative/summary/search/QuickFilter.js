import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'native-base';
import colors from 'eoffice/utils/colors';

import filters from './quick-filters';

const QuickFilter = ({ setValue }) => {
  const list = filters.map(filter => ({ ...filter, checked: false }));
  const [filterList, setFilterList] = useState(list);

  function onSelectQuick(item, index) {
    setValue(item.targetStart, item.getValueStart());
    setValue(item.targetEnd, item.getValueEnd());

    const arr = filters.map(filter => ({ ...filter, checked: false }));
    arr[index].checked = true;
    setFilterList(arr);
  }

  return (
    <View style={{ paddingVertical: 10, paddingLeft: 15, flexDirection: 'column' }}>
      <Text
        uppercase
        style={{ fontSize: 13, fontWeight: '600', color: colors.gray, marginBottom: 12 }}
      >
        Tìm nhanh
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={filterList}
        keyExtractor={({ label, target }) => `${label}-${target}`}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item, index }) => (
          <Button
            rounded
            bordered
            small
            style={{
              borderColor: '#dcdce6',
              backgroundColor: item.checked ? '#025aaa' : '#fff',
              height: 35,
            }}
            onPress={() => onSelectQuick(item, index)}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: item.checked ? '#fff' : colors.blue,
              }}
            >
              {item.label}
            </Text>
          </Button>
        )}
      />
    </View>
  );
};

QuickFilter.propTypes = {
  setValue: PropTypes.func.isRequired,
};

export default QuickFilter;
