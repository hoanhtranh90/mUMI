import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import format from 'date-fns/format';
import { STATUS_CODE } from 'eoffice/constants/administrative';

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
  const createdTime = format(request.item.createTime ?
    new Date(request.item.createTime) : new Date(), 'dd/MM/yyyy');
  let color = '';
  let statusColor = '';
  if (request.item.status === STATUS_CODE.HOANTHANH) {
    color = 'rgba(57, 202, 116, 0.2)';
    statusColor = '#39ca74';
  } else if (request.item.status === STATUS_CODE.HUY) {
    color = 'rgba(255, 59, 48, 0.2)';
    statusColor = '#ff3b30';
  } else {
    color = 'rgba(240, 195, 48, 0.2)';
    statusColor = '#f0c330';
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{request.item.caseTitle}</Text>
        <Text style={styles.desc}>{request.item.requestDeptName}</Text>
        <View style={styles.row}>
          <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
            <Text style={[styles.status, { color: statusColor }]}>{request.item.state}</Text>
          </View>
          <View style={styles.rowDate}>
            <Icon name="clock" type="Feather" style={styles.icon} />
            <Text style={styles.date}>{createdTime}</Text>
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
