import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  outer: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ceced2',
    borderRadius: 12,
  },
  inner: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
  },
  outerChecked: {
    borderColor: colors.blue,
    borderWidth: 1,
  },
  innerChecked: {
    backgroundColor: colors.blue,
  },
  small: {
    width: 20,
    height: 20,
  },
  square: {
    borderRadius: 6,
  },
});

const Checkbox = ({ checked, small, square, style }) => (
  <View
    style={[
      styles.outer,
      checked ? styles.outerChecked : null,
      small ? styles.small : null,
      square ? styles.square : null,
      style,
    ]}
  >
    <View
      style={[styles.inner, checked ? styles.innerChecked : null, square ? styles.square : null]}
    />
  </View>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  small: PropTypes.bool,
  square: PropTypes.bool,
  style: PropTypes.shape({}),
};
Checkbox.defaultProps = {
  checked: false,
  small: false,
  square: false,
  style: null,
};

export default Checkbox;
