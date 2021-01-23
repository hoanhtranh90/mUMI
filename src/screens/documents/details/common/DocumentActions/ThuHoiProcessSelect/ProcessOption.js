import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import Checkbox from 'eoffice/components/Checkbox';
import { PROCESS_TYPE_TEXTS } from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';
import { formatDate } from 'eoffice/utils/utils';

const typeColors = {
  0: colors.blue,
  1: colors.green,
  2: colors.yellow,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    width: 26,
    paddingRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  name: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: '600',
  },
  sub: {
    fontSize: 12,
    color: 'rgba(43, 45, 80, 0.5)',
  },
});

const ProcessOption = ({ process, toggle }) => (
  <TouchableOpacity onPress={() => toggle(process.id)} style={styles.row}>
    <View style={styles.checkbox}>
      <Checkbox small square checked={process.selected} />
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>
        {`${process.receiverName || process.deptReceiverName} - `}
        <Text style={{ color: typeColors[process.processType] || colors.blue }}>
          {PROCESS_TYPE_TEXTS[process.processType] || 'Đơn vị'}
        </Text>
      </Text>
      {!!process.receiverName && (
        <Text style={styles.sub}>
          {`${process.roleReceiverName} - ${process.deptReceiverName}`}
        </Text>
      )}
      <Text style={styles.sub}>{`Ngày chuyển: ${formatDate(new Date(process.updateTime))}`}</Text>
    </View>
  </TouchableOpacity>
);

ProcessOption.propTypes = {
  process: PropTypes.shape({}).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ProcessOption;
