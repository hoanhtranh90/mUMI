import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KHACH_SAN_TYPE } from '../../../../constants/administrative';
import {
  changeMode,
  getProcessedRequest,
  getProcessingRequest,
  getRequestSupportDetail,
  openCreateRequest,
} from '../../../../store/administrative/requestSupport/reducer';
import { Icon, Spinner } from 'native-base';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import ModeSwitches from './ModeSwitches';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import colors from '../../../../utils/colors';

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
  btnAdd: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 30,
    bottom: 70,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});

const RequestSupportList = ({
  getProcessedRequest,
  getProcessingRequest,
  listProcessedRequest,
  listProcessingRequest,
  changeMode,
  mode,
  openCreateRequest,
  getRequestSupportDetail,
}) => {
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      loadData();
    },
    [mode]
  );

  useEffect(
    () => {
      setRefreshing(false);
      setIsLoading(false);
      if (mode === KHACH_SAN_TYPE.CHO_XU_LY) {
        setListData(listProcessingRequest);
      } else setListData(listProcessedRequest);
    },
    [listProcessedRequest, listProcessingRequest]
  );

  const loadData = () => {
    if (mode === KHACH_SAN_TYPE.CHO_XU_LY) {
      getProcessingRequest({});
    } else getProcessedRequest({});
  };

  const getStatusText = status => {
    if (status === 2) {
      return 'Đã phê duyệt'
    } else if (status === 3) {
      return 'Hủy yêu cầu'
    } else {
      return 'Chờ phê duyệt'
    }
  }

  const Item = ({ item }) => {
    const createdTime = item.id
      ? format(new Date(item.id), 'dd/MM/yyyy')
      : format(new Date(), 'dd/MM/yyyy');
    let color = '';
    let statusColor = '';
    if (item.approveStatus === 2) {
      color = 'rgba(57, 202, 116, 0.2)';
      statusColor = '#39ca74';
    } else if (item.approveStatus === 3) {
      color = 'rgba(255, 59, 48, 0.2)';
      statusColor = '#ff3b30';
    } else {
      color = 'rgba(240, 195, 48, 0.2)';
      statusColor = '#f0c330';
    }
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          getRequestSupportDetail(item.id);
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Text>{item.requestDeptName}</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
            <Text style={[styles.status, { color: statusColor }]}>{getStatusText(item.approveStatus)}</Text>
          </View>
          <View style={styles.rowDate}>
            <Icon name="clock" type="Feather" style={styles.icon} />
            <Text style={styles.date}>{createdTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 20 }}>
      <ModeSwitches mode={mode} changeMode={changeMode} />
      {isLoading && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Spinner />
        </View>
      )}
      {!isLoading &&
        (listData.length > 0 ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={listData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} />}
          />
        ) : (
          <ListEmptyComponent />
        ))}
      <TouchableOpacity style={styles.btnAdd} onPress={() => openCreateRequest()}>
        <Icon name="plus" type="Feather" style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = {
  getProcessedRequest: getProcessedRequest,
  getProcessingRequest: getProcessingRequest,
  changeMode: changeMode,
  openCreateRequest: openCreateRequest,
  getRequestSupportDetail: getRequestSupportDetail,
};

const mapStateToProps = ({ requestSupport }) => ({
  listProcessedRequest: requestSupport.listProcessedRequest,
  listProcessingRequest: requestSupport.listProcessingRequest,
  mode: requestSupport.mode,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestSupportList);
