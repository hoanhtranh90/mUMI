/* eslint-disable react/jsx-wrap-multilines */

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import UserItem from 'eoffice/components/UserItem';
import colors from 'eoffice/utils/colors';
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

const SelectedHandlers = ({ containerStyle, handlers, roleName, selected, onRemove }) => (
  <View style={[styles.wrapper, containerStyle]}>
    {roleName && (
      <Text style={styles.label} uppercase>
        {roleName}
      </Text>
    )}
    {!selected.size && <HandlerPlaceholder roleName={roleName} />}
    {selected.size > 0 && (
      <FlatList
        data={handlers}
        extraData={selected}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserItem
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
  </View>
);

SelectedHandlers.propTypes = {
  containerStyle: PropTypes.shape({}),
  handlers: PropTypes.arrayOf(PropTypes.shape({})),
  onRemove: PropTypes.func,
  roleName: PropTypes.string,
  selected: PropTypes.instanceOf(Set),
};
SelectedHandlers.defaultProps = {
  containerStyle: {},
  handlers: [],
  onRemove() {},
  roleName: null,
  selected: new Set(),
};

export default SelectedHandlers;
