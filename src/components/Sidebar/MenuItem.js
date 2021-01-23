/* eslint-disable global-require,import/no-unresolved */
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15,
    marginRight: 12,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    maxHeight: 74,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  icon: {
    maxWidth: 32,
    maxHeight: 32,
  },
  txtContainer: {
    paddingLeft: 16,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleItem: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const MenuItem = ({ label, img, labelColor, onPress, focused, itemHeight, paddingItem }) => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <View
      style={[
        styles.row,
        {
          borderColor: focused ? 'rgba(0, 122, 255, 0.5)' : colors.lighterGray,
          backgroundColor: focused ? 'white' : colors.lighterGray,
        },
        { height: itemHeight, marginTop: paddingItem },
      ]}
    >
      <View style={styles.iconContainer}>
        <Image
          style={[styles.icon, { height: itemHeight * 2.3125, width: itemHeight * 2.3125 }]}
          resizeMode="contain"
          source={img}
        />
      </View>
      <View style={styles.txtContainer}>
        <Text style={[styles.titleItem, { color: labelColor }]}>{label}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

MenuItem.propTypes = {
  paddingItem: PropTypes.number,
  itemHeight: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  img: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,
};

MenuItem.defaultProps = {
  itemHeight: 74,
  paddingItem: 8,
};

export default MenuItem;
