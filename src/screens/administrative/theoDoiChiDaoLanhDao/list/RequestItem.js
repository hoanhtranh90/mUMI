/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import format from 'date-fns/format';
import {CHI_DAO_STATE, PROCESS_TYPE} from "../../../../constants/common";

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
  titleDirective: {
    fontSize: 15,
    fontWeight: 'bold',
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
    alignItems: 'center',
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
    alignItems: 'center'
  },
  date: {
    color: '#2b2d50',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
});

const CustomContent = ({title, desc, color}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.desc}>{title}
        <Text style={[styles.titleDirective,{color: color}]}>
          {desc}
        </Text>
      </Text>
    </View>
  )
}

const RequestItem = ({ request, onPress }) => {
  const commandsDate = format(new Date(request.item.commandsDate), 'dd/MM/yyyy');
  let color = '#fff';
  let statusColor = '';
  let commandsStatus = '';
  let processType = '';
  if (request.item.state === CHI_DAO_STATE.HOAN_THANH) {
    color = 'rgba(57, 202, 116, 0.2)';
    statusColor = '#39ca74';
    commandsStatus = 'Hoàn thành';
  } else if (request.item.state === CHI_DAO_STATE.CHO_PHE_DUYET_HOAN_THANH) {
    color = '#d0e7fb';
    statusColor = '#5CA6FC';
    commandsStatus = 'Chờ phê duyệt';
  } else if (request.item.state === CHI_DAO_STATE.DANG_THUC_HIEN) {
    color = 'rgba(240, 195, 48, 0.2)';
    statusColor = '#f0c330';
    commandsStatus = 'Đang xử lý';
  } else if (request.item.state === CHI_DAO_STATE.HUY_CHI_DAO) {
    color = '#f5abab';
    statusColor = '#FF0000';
    commandsStatus = 'Huỷ';
  }

  if (request.item.processType === PROCESS_TYPE.CHU_TRI) {
    processType = 'ĐV chủ trì : '
  } else {
    processType = 'ĐV phối hợp : '
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{request.item.meeting}</Text>
        <CustomContent title={processType} desc={request.item.deptName} color={'#2b2d50'}/>
        <CustomContent title={'LĐ chỉ đạo : '} desc={request.item.directiveFullName} color={'#5CA6FC'}/>
        <CustomContent title={'LĐ phụ trách : '} desc={request.item.performFullName} color={'#5CA6FC'}/>
        <View style={styles.row}>
          <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
            <Text style={[styles.status, { color: statusColor }]}>{commandsStatus}</Text>
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
