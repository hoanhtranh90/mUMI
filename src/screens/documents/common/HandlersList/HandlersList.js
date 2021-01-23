import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import Checkbox from 'eoffice/components/Checkbox';
import UserItem from 'eoffice/components/UserItem';
import colors from 'eoffice/utils/colors';
import { compareUserDeptRoleView } from '../../../../utils/utils';

const HandlersList = ({ handlers, onSelect, selected }) => {
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    handlers.sort((a, b) => compareUserDeptRoleView(a, b));
    setSortData(handlers.sort((a, b) => compareUserDeptRoleView(a, b)));
  });

  return (
    <FlatList
      data={sortData}
      extraData={selected}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <UserItem
          key={item.id}
          user={item}
          avatarSize={48}
          onPress={() => onSelect(item.id)}
          ActionComponent={
            <Checkbox checked={selected[item.id]} style={{ marginHorizontal: 12 }} />
          }
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: colors.lighterGray, marginLeft: 58 }} />
      )}
    />
  );
};

HandlersList.propTypes = {
  handlers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};
HandlersList.defaultProps = {
  onSelect() {},
  selected: {},
};

export default HandlersList;
