import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'native-base';

import colors from 'eoffice/utils/colors';

const style = {
  viewContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
    flexDirection: 'column',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 12,
  },
  textFlatList: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: '600',
  },
};

const QuickFilter = ({ onChange, filters }) => {
  const [itemChoosed, setItemChoosed] = useState();
  return (
    <View style={style.viewContainer}>
      <Text uppercase style={style.text}>
        Tìm nhanh
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        keyExtractor={({ label, target }) => `${label}-${target}`}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <Button
            rounded
            bordered
            small
            style={{
              borderColor: '#dcdce6',
              backgroundColor: itemChoosed?.id === item.id ? '#dcdce6' : '#fff',
            }}
            onPress={() => {
              setItemChoosed(item);
              onChange(item.target, item.getValue());
            }}
          >
            <Text style={style.textFlatList}>{item.label}</Text>
          </Button>
        )}
      />
    </View>
  );
};

QuickFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      target: PropTypes.string,
      getValue: PropTypes.func,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuickFilter;
