import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import { TASK_STATUS_DISPLAY } from 'eoffice/constants/tasks';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

const TaskStatus = ({ status }) => {
  const display = TASK_STATUS_DISPLAY[status];
  if (!display) {
    return null;
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: display.bgColor }]}>
      <Text style={[styles.label, { color: display.color }]}>{display.label}</Text>
    </View>
  );
};

TaskStatus.propTypes = {
  status: PropTypes.number,
};
TaskStatus.defaultProps = {
  status: null,
};

export default TaskStatus;
