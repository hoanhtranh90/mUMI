import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import NotificationItem from './notification.item';
import { connect } from 'react-redux';
import { selectors, actions as documentActions } from 'eoffice/store/documents/notification';
import { actions as docsActions } from 'eoffice/store/documents/list';
import { actions as adminsActions } from 'eoffice/store/administrative/summary';
import { Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {
  CHI_DAO_MESSAGE_TYPE,
  MESSAGE_TYPE_DIEU_XE,
  MESSAGE_TYPE_KHACH_SAN,
  MESSAGE_TYPE_MAY_BAY,
} from '../../../constants/administrative';

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  emptyContainer: { justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
});

const checkType = msgType => {
  return (
    msgType === 'chuyenXuLy' ||
    msgType === 'outgoing.comment' ||
    msgType === 'ingoing.comment' ||
    msgType === 'thuHoi' ||
    msgType === 'ketThuc' ||
    msgType === 'tuChoi' ||
    msgType === 'CC' ||
    msgType === 'banhanh' ||
    msgType === 'incoming.banhanh' ||
    msgType === 'choBanHanh' ||
    msgType === 'tuChoiTiepNhan' ||
    msgType === 'chuyenTiepLanhDao' ||
    msgType === 'tuChoiBanHanh' ||
    msgType === 'chuyenTiep' ||
    msgType === 'incoming.comment' ||
    msgType === 'lanhDaoTuChoi' ||
    msgType === 'cv.canhBaoQuaHan' ||
    Object.values(CHI_DAO_MESSAGE_TYPE).includes(msgType) ||
    Object.values(MESSAGE_TYPE_DIEU_XE).includes(msgType) ||
    Object.values(MESSAGE_TYPE_MAY_BAY).includes(msgType) ||
    Object.values(MESSAGE_TYPE_KHACH_SAN).includes(msgType)
  );
};

const NotificationList = ({
  notifications,
  getNotifications,
  refreshNotifications,
  deleteNotify,
  markAsRead,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(
    () => {
      setRefreshing(false);
    },
    [notifications]
  );

  const refresh = async () => {
    setRefreshing(true);
    await refreshNotifications();
    await getNotifications();
    setRefreshing(false);
  };

  const renderRow = props => {
    if (checkType(props.item.messageType))
      return (
        <NotificationItem notify={props.item} markAsRead={markAsRead} deleteNotify={deleteNotify} />
      );
    else return <></>;
  };
  console.log(notifications);
  return (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        keyExtractor={(item, index) => `${index}`}
        data={notifications}
        renderItem={renderRow}
        onEndReached={getNotifications}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>Không có dữ liệu</Text>
          </View>
        }
      />
      {notifications.length === 0 && refreshing === true && (
        <View style={styles.overlay}>
          <Spinner />
        </View>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  notifications: selectors.listNotificationsSelector(state),
});
const mapDispatchToProps = dispatch => ({
  onDocumentPressed: async docUserView => {
    dispatch(docsActions.viewDetail(docUserView));
  },
  refreshNotifications: () => dispatch(documentActions.refreshNotifications()),
  getNotifications: () => {
    dispatch(documentActions.getNotifications());
  },
  viewDocDetail: (docUserView, notify) => {
    if (docUserView !== null) {
      dispatch(docsActions.viewDetail(docUserView));
    }
    if (notify.status === 'unSeen') {
      dispatch(documentActions.markAsRead(notify.notificationDetailId));
    }
  },
  setHcFlow: flowCode => {
    dispatch(adminsActions.setHcFlow(flowCode));
  },
  markAsRead: async id => dispatch(documentActions.markAsRead(id)),
  deleteNotify: async id => dispatch(documentActions.deleteNotify(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationList);
