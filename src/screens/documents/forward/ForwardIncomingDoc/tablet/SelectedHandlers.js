/* eslint-disable react/jsx-wrap-multilines */

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import UserItem from 'eoffice/components/Tablet/UserItem';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    marginLeft: 10,
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

const SelectedHandlers = ({ containerStyle, handlers, selected, onRemove, onChange, roleAll }) => (
  <View style={[styles.wrapper, containerStyle]}>
    <View style={{ height: 10 }} />
    <View style={{ flex: 1 }}>
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
              avatarSize={52}
              roleRow={(id, roleNew) => {
                onChange(id, roleNew);
              }}
              onRemove={(id, roleOld) => {
                onRemove(id, roleOld);
              }}
              roleAll={roleAll}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.lighterGray, marginLeft: 58 }} />
          )}
          ListFooterComponent={() => (
            <>
              <View style={{ height: 10 }} />
              <View
                style={{ height: 2, backgroundColor: colors.lighterGray, marginHorizontal: 10 }}
              />
            </>
          )}
        />
      )}
    </View>
  </View>
);

SelectedHandlers.propTypes = {
  containerStyle: PropTypes.shape({}),
  handlers: PropTypes.arrayOf(PropTypes.shape({})),
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  selected: PropTypes.instanceOf(Set),
  roleAll: PropTypes.string,
};
SelectedHandlers.defaultProps = {
  containerStyle: {},
  handlers: [],
  onRemove() {},
  onChange() {},
  roleAll: null,
  selected: new Set(),
};

export default SelectedHandlers;
