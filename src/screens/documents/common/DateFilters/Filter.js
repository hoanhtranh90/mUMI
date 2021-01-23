import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from 'eoffice/utils/colors';
import DateRangePicker from '../../../../components/DateRangePicker';

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'transparent',
    borderColor: '#dcdce6',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: null,
  },
  label: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: '600',
  },
  selected: {
    backgroundColor: '#dcdce6',
  },
});

const Filter = ({ current, id, label, onPress, selected }) => {
  if (id === 'custom') {
    return (
      <DateRangePicker
        label={<Text style={styles.label}>{label}</Text>}
        onChange={onPress}
        value={current || []}
        style={[styles.btn, selected ? styles.selected : null]}
      />
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, selected ? styles.selected : null]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  current: PropTypes.any,
  id: PropTypes.string,
  selected: PropTypes.bool,
};
Filter.defaultProps = {
  current: null,
  id: null,
  selected: false,
};

export default Filter;
