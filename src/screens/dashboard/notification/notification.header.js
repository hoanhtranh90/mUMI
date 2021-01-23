import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import IconButton from 'eoffice/components/IconButton';
import { Icon } from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import { selectors } from '../../../store/auth';
import { connect } from 'react-redux';
import { actions as documentActions } from 'eoffice/store/documents/notification';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
});

const NotificationHeader = ({
  navigation,
  currentUserDeptRole,
  markAsReadAll,
  deleteAll,
  isMobile,
}) => {
  useEffect(
    () => {
      console.log(isMobile);
    },
    [isMobile]
  );

  const sheetRef = useRef(null);

  const deleteAllNotify = () => {
    Alert.alert('Bạn có muốn thực hiện xóa tất cả thông báo không ?', '', [
      {
        text: 'Đồng ý',
        onPress: async () => {
          await deleteAll();
          sheetRef.current.close();
        },
        style: 'destructive',
      },
      { text: 'Huỷ', onPress: () => {}, style: 'cancel' },
    ]);
  };

  const markAsReadAllNotify = async () => {
    await markAsReadAll();
    sheetRef.current.close();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              icon="arrow-left"
              iconStyle={{ color: '#abb4bd' }}
              onPress={() => navigation.goBack()}
            />
          )}
          <Text style={styles.title}>Thông báo</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => sheetRef.current.open()}>
          <Icon name="dots-three-horizontal" type="Entypo" style={{ fontSize: 24, width: 25 }} />
        </TouchableOpacity>
      </View>
      {isMobile && (
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon style={styles.icon} type="Feather" name="user" />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {currentUserDeptRole.positionName} - {currentUserDeptRole.deptCode}
            </Text>
          </View>
        </View>
      )}

      <RBSheet ref={sheetRef} openDuration={250} closeOnDragDown={true} closeOnPressMask={true}>
        <ScrollView>
          <TouchableOpacity
            onPress={markAsReadAllNotify}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: '#eee',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="eye" type="Entypo" style={{ fontSize: 20 }} />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 20 }}>Đánh dấu tất cả đã đọc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteAllNotify}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: '#eee',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="trash" type="Entypo" style={{ fontSize: 20 }} />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 20 }}>Xóa tất cả thông báo</Text>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
    </>
  );
};

const mapStateToProps = state => ({
  currentUserDeptRole: selectors.deptRoleSelector(state),
});

const mapDispatchToProps = dispatch => ({
  markAsReadAll: async () => dispatch(documentActions.markAsReadAll()),
  deleteAll: async () => dispatch(documentActions.deleteAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationHeader);
