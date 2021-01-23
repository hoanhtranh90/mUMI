import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import ModeSwitches from '../../../components/ModeSwitches';
import { TASK_FILTERS, TASK_TYPES } from '../../../constants/tasks';
import colors from '../../../utils/colors';
import HorizontalFilters from '../../../components/HorizontalFilters';
import DeviceInfo from 'react-native-device-info';

const modes = [
  {
    label: 'Việc được giao',
    value: TASK_TYPES.RECEIVED,
  },
  {
    label: 'Việc tôi giao',
    value: TASK_TYPES.ASSIGNED,
  },
];

const filters = Object.values(TASK_FILTERS);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  labelWrapper: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderColor: '#dcdce6',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 15,
    marginRight: 6,
    color: colors.darkGray,
  },
  filterLabel: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '600',
  },
  separator: { width: 8 },
});

const ListHeading = ({ mode, setMode, updateQuery }) => {
  useEffect(() => {
    updateQuery({ taskStatusFilter: null });
  }, []);

  return (
    <View style={styles.container}>
      {!DeviceInfo.isTablet() && <ModeSwitches modes={modes} current={mode} onChange={setMode} />}
      <View style={styles.labelWrapper}>
        <Text uppercase style={styles.label}>
          Lọc nhanh
        </Text>
      </View>
      <HorizontalFilters
        filters={filters}
        onFilter={filter => updateQuery({ taskStatusFilter: filter })}
      />
    </View>
  );
};

ListHeading.propTypes = {
  mode: PropTypes.string.isRequired,
  query: PropTypes.shape({
    taskStatusFilter: PropTypes.string,
  }).isRequired,
  setMode: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
};

export default ListHeading;
