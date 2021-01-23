import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';

import colors from 'eoffice/utils/colors';
import PercentInput from './PercentInput';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  rail: {
    height: 10,
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: 10,
    backgroundColor: colors.blue,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  changeBar: {
    height: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 6,
  },
  iconWrapper: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 0,
    paddingRight: 0,
    color: colors.darkGray,
  },
});
const inputStyles = {
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
};

const ProgressField = ({ current, onChange, value }) => {
  const diff = value - current;
  const completed = Math.min(current, value);

  return (
    <View style={styles.wrapper}>
      <View style={styles.rail}>
        <View style={[styles.bar, { flex: completed / 100 }]} />
        <View
          style={[
            styles.changeBar,
            {
              flex: Math.abs(diff) / 100,
              backgroundColor: diff < 0 ? colors.red : colors.green,
            },
          ]}
        />
      </View>
      <View style={styles.row}>
        <PercentInput value={`${current}`} editable={false} />
        <View style={styles.iconWrapper}>
          <Icon name="arrow-right" style={styles.icon} />
        </View>
        <PercentInput
          value={`${value}`}
          onChangeText={txt => onChange(Math.min(Number(txt) || 0, 100))}
          styles={inputStyles}
        />
      </View>
    </View>
  );
};

ProgressField.propTypes = {
  onChange: PropTypes.func.isRequired,

  current: PropTypes.number,
  value: PropTypes.number,
};
ProgressField.defaultProps = {
  current: 0,
  value: 0,
};

export default ProgressField;
