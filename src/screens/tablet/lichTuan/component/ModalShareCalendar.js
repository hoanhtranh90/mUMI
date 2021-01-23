import { StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon, Spinner, Button, Toast } from 'native-base';
import ReactNativeModal from 'react-native-modal';
import colors from '../../../../utils/colors';
import * as service from '../../../../store/hcCalendar/service';

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    // margin: 150,
  },

  childContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
  },

  icon: {
    fontSize: 18,
    color: '#aaa',
    marginRight: 5,
  },

  formItem: {
    paddingHorizontal: 10,
    height: 35,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnOK: {
    flex: 7,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
  },
  btnCancel: {
    flex: 2,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  iconChecked: {
    color: colors.blue,
    position: 'absolute',
    fontSize: 16,
    right: 5,
  },
  iconDelete: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
});

const ModalShareCalendar = ({ isOpen, close, detail }) => {
  const [userChoosed, setUserChoosed] = useState([]);
  const [userLoaded, setUserLoaded] = useState([]);
  const [keyword, setKeyword] = useState('');

  const selectUser = user => {
    let userHasSelect = userChoosed.find(item => item.id === user.id);
    if (!userHasSelect) {
      setUserChoosed(val => [...val, user]);
    }
  };

  const removeUser = user => {
    setUserChoosed(val => val.filter(item => item.id !== user.id));
  };

  const isChecked = user => {
    return userChoosed.findIndex(item => item.id === user.id) !== -1;
  };

  const UserItem = ({ user }) => (
    <TouchableOpacity onPress={() => selectUser(user)} style={{ position: 'relative' }}>
      <Text style={{ fontSize: 16 }}>{user.fullName}</Text>
      <Text style={{ fontSize: 14, color: colors.gray }}>
        {user.positionName} - {user.deptName}
      </Text>
      {isChecked(user) && <Icon type="Feather" name="check" style={styles.iconChecked} />}
    </TouchableOpacity>
  );

  const UserItemChoosed = ({ user }) => (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        position: 'relative',
      }}
    >
      <Text style={{ fontSize: 16 }}>{user.fullName}</Text>
      <Text style={{ fontSize: 14, color: colors.gray }}>
        {user.positionName} - {user.deptName}
      </Text>
      <TouchableOpacity onPress={() => removeUser(user)} style={styles.iconDelete}>
        <Icon type="Feather" name="x-circle" style={{ fontSize: 22, color: colors.red }} />
      </TouchableOpacity>
    </View>
  );

  const loadData = () => {
    let query = {
      query: keyword,
      hcCaseCalendarId: detail.id,
      sort: 'fullName,asc',
      size: 1000,
    };
    service.loadUserForShare(query).then(users => setUserLoaded(users));
  };

  useEffect(
    () => {
      if (detail && keyword) {
        loadData();
      }
    },
    [keyword]
  );

  const share = () => {
    let userDeptRoleIds = userChoosed.map(user => user.id);
    if (userDeptRoleIds.length > 0)
      service.share(detail.id, { userDeptRoleIds }).then(res => {
        Toast.show({
          duration: 3000,
          text: 'Chia sẻ lịch tuần thành công',
          type: 'success',
        });
        closeModal();
      });
  };

  const closeModal = () => {
    setKeyword('');
    setUserLoaded([]);
    setUserChoosed([]);
    close();
  };

  return (
    <ReactNativeModal
      onBackdropPress={closeModal}
      isVisible={isOpen}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modalContainer}
    >
      <View style={styles.childContainer}>
        <View style={{ flex: 1, padding: 15 }}>
          <View style={styles.formItem}>
            <Icon type="Feather" name="search" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Gõ tên/email/đơn vị/chức danh để bắt đầu tìm kiếm"
              value={keyword}
              onChangeText={text => setKeyword(text)}
            />
          </View>
          <FlatList
            data={userLoaded}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <UserItem user={item} />}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, borderWidth: 0.5, marginVertical: 8, borderColor: '#eee' }}
              />
            )}
          />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: '#eee',
            padding: 15,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Chia sẻ lịch tuần</Text>
          </View>
          <FlatList
            data={userChoosed}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <UserItemChoosed user={item} />}
          />
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Button style={styles.btnOK} onPress={share} disabled={userChoosed.length === 0}>
              <Text style={styles.btnText}>Chia sẻ</Text>
            </Button>
            <Button style={styles.btnCancel} onPress={closeModal}>
              <Text style={{ fontSize: 16, color: colors.red, fontWeight: 'bold' }}>Quay lại</Text>
            </Button>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalShareCalendar;
