/* eslint-disable react/jsx-wrap-multilines */

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import UserItem from 'eoffice/components/UserItem';
import colors from 'eoffice/utils/colors';
import DeptItem from 'eoffice/components/DeptItem';
import HandlerPlaceholder from './HandlerPlaceholder';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
  },
  label: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  btn: {
    backgroundColor: colors.darkGray,
    borderColor: colors.darkGray,
    height: 24,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
  },
  icon: {
    fontSize: 12,
    color: '#fff',
  },
});

const SelectedHandlers = ({
  containerStyle,
  handlers,
  handlerDepts,
  roleName,
  selected,
  selectedDept,
  onRemoveDept,
  onRemove,
}) => (
  <View style={[styles.wrapper, containerStyle]}>
    <Text style={styles.label} uppercase>
      {roleName}
    </Text>
    {!selected.size && !selectedDept.size && <HandlerPlaceholder roleName={roleName} />}
    {selected.size > 0 && (
      <FlatList
        data={handlers}
        extraData={selected}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserItem
            key={item.id}
            disabled
            user={item}
            avatarSize={48}
            ActionComponent={
              <IconButton
                icon="x"
                iconStyle={styles.icon}
                style={styles.btn}
                onPress={() => onRemove(item.id)}
              />
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.lighterGray, marginLeft: 58 }} />
        )}
      />
    )}
    {selectedDept.size > 0 && (
      <FlatList
        data={handlerDepts}
        extraData={selectedDept}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <DeptItem
            key={item.id}
            disabled
            dept={item}
            idx={index}
            avatarSize={48}
            ActionComponent={
              <IconButton
                icon="x"
                iconStyle={styles.icon}
                style={styles.btn}
                onPress={() => onRemoveDept(item.id)}
              />
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.lighterGray, marginLeft: 10 }} />
        )}
      />
    )}
  </View>
);

SelectedHandlers.propTypes = {
  containerStyle: PropTypes.shape({}),
  handlers: PropTypes.arrayOf(PropTypes.shape({})),
  handlerDepts: PropTypes.arrayOf(PropTypes.shape({})),
  onRemove: PropTypes.func,
  onRemoveDept: PropTypes.func,
  roleName: PropTypes.string,
  selected: PropTypes.instanceOf(Set),
  selectedDept: PropTypes.instanceOf(Set),
};
SelectedHandlers.defaultProps = {
  containerStyle: {},
  handlers: [],
  handlerDepts: [],
  onRemove() {},
  onRemoveDept() {},
  roleName: '',
  selected: new Set(),
  selectedDept: new Set(),
};

export default SelectedHandlers;
