import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { Picker } from 'native-base';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  placeholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  text: {
    color: colors.darkGray,
    paddingLeft: 0,
    paddingRight: 0,
    flexShrink: 1,
    fontWeight: 'bold',
  },
});

const CustomPicker = ({ items, placeholder, isPickAll, ...props }) => {
  const list =
    Platform.OS === 'android' || isPickAll
      ? [{ value: undefined, label: placeholder || 'Chọn một' }, ...items]
      : items;
  return (
    <Picker
      {...props}
      placeholder={placeholder}
      placeholderStyle={styles.placeholder}
      // textStyle={styles.text}
      iosHeader="Chọn một"
      headerBackButtonText="Huỷ"
    >
      {list.map(item => (
        <Picker.Item
          {...item}
          key={`${item.value}`}
          color={!item.value ? colors.gray : colors.darkGray}
        />
      ))}
    </Picker>
  );
};

CustomPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  isPickAll: PropTypes.bool,
};
CustomPicker.defaultProps = {
  placeholder: undefined,
  isPickAll: false,
};

export default CustomPicker;
