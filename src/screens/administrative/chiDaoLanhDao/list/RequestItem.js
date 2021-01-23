import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import format from 'date-fns/format';

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: '#efeff4',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2b2d50',
  },
  desc: {
    color: 'gray',
    marginTop: 4,
  },
  icon: {
    fontSize: 12,
    color: '#abb4bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
  },
  wrapperStatus: {
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginRight: 10,
    flexDirection: 'row',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 4,
    flex: 1,
    marginRight: 10,
  },
  date: {
    color: '#2b2d50',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
});

const RequestItem = ({ request, onPress }) => {
  const commandsDate = format(new Date(request.item.commandsDate), 'dd/MM/yyyy');
  let color = '';
  let statusColor = '';

  color = 'rgba(240, 195, 48, 0.2)';
  statusColor = '#f0c330';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{request.item.meeting}</Text>
        <Text style={styles.desc}>{request.item.deptName}</Text>
        <View style={styles.row}>
          <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
            <Text style={[styles.status, { color: statusColor }]}>{request.item.state}</Text>
          </View>
          <View style={styles.rowDate}>
            <Icon name="clock" type="Feather" style={styles.icon} />
            <Text style={styles.date}>{commandsDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

RequestItem.propTypes = {
  request: PropTypes.shape({}),
  onPress: PropTypes.func,
};
RequestItem.defaultProps = {
  request: null,
  onPress: null,
};

export default RequestItem;
