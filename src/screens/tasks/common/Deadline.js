import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'native-base';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import isSameYear from 'date-fns/isSameYear';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGreen,
  },
  text: {
    color: colors.green,
    fontSize: 14,
    paddingHorizontal: 3,
  },
  warning: {
    backgroundColor: colors.lightYellow,
  },
  warningText: {
    color: colors.yellow,
  },
  danger: {
    backgroundColor: colors.lightRed,
  },
  dangerText: {
    color: colors.red,
  },
});

const Deadline = ({ deadline }) => {
  const today = new Date();
  const remain = differenceInDays(today, deadline);
  const formatStr = isSameYear(today, deadline) ? 'dd/MM' : 'dd/MM/yyyy';
  let warning = false;
  let danger = false;

  if (remain > 0) {
    danger = true;
  } else if (remain > -10) {
    warning = true;
  }

  return (
    <View style={[styles.wrapper, warning ? styles.warning : null, danger ? styles.danger : null]}>
      <Icon
        name="clock"
        type="MaterialCommunityIcons"
        style={[
          styles.text,
          warning ? styles.warningText : null,
          danger ? styles.dangerText : null,
        ]}
      />
      <Text
        style={[
          styles.text,
          warning ? styles.warningText : null,
          danger ? styles.dangerText : null,
        ]}
      >
        {format(deadline, formatStr)}
      </Text>
    </View>
  );
};

Deadline.propTypes = {
  deadline: PropTypes.instanceOf(Date).isRequired,
};

export default Deadline;
