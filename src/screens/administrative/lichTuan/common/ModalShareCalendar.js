import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button, Toast } from 'native-base';
import colors from '../../../../utils/colors';
import _ from 'lodash';
import Checkbox from 'eoffice/components/Checkbox';
import * as service from '../../../../store/hcCalendar/service';

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  childContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerCancel: {
    fontSize: 16,
    color: colors.red,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupText: {
    color: colors.yellow,
  },
  positionText: {
    color: colors.gray,
  },
  nameText: {
    color: colors.darkGray,
  },
  txtBold: {
    fontWeight: 'bold',
  },
  group: {
    borderRadius: 10,
    backgroundColor: '#faf3da',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  searchWrapper: {
    backgroundColor: '#eee',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  searchIcon: {
    width: 30,
    color: colors.blue,
    fontSize: 18,
  },
  searchText: {
    color: colors.darkGray,
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
  iconChecked: {
    color: colors.blue,
    position: 'absolute',
    fontSize: 16,
    right: 5,
  },
  tabActive: {
    flex: 1,
  },
  tabDeactive: {
    flex: 1,
  },
  txtActive: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.blue,
  },
  txtDeactive: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.gray,
  },
});

const TAB = {
  LIST: 'list',
  CHOOSED: 'choosed',
};

const ModalShareCalendar = ({ isOpen, close, detail }) => {
  const [userChoosed, setUserChoosed] = useState([]);
  const [userLoaded, setUserLoaded] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentTab, setCurrentTab] = useState(TAB.LIST);

  const isActive = tabKey => {
    return currentTab === tabKey;
  };

  const selectUser = user => {
    let userHasSelect = userChoosed.find(item => item.id === user.id);
    if (!userHasSelect) {
      setUserChoosed(val => [...val, user]);
    } else removeUser(user);
  };

  const removeUser = user => {
    setUserChoosed(val => val.filter(item => item.id !== user.id));
  };

  const isChecked = user => {
    return userChoosed.findIndex(item => item.id === user.id) !== -1;
  };

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

  const GroupItemRow = ({ user }) => (
    <TouchableOpacity onPress={() => selectUser(user)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{user.fullName}</Text>
        <Text style={[styles.positionText]}>
          {user.positionName} - {user.deptName}
        </Text>
      </View>
      {isChecked(user) && <Icon type="Feather" name="check" style={styles.iconChecked} />}
    </TouchableOpacity>
  );

  const GroupItemRowChoosed = ({ user }) => (
    <View style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{user.fullName}</Text>
        <Text style={[styles.positionText]}>
          {user.positionName} - {user.deptName}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeUser(user)} style={styles.iconDelete}>
        <Icon type="Feather" name="x-circle" style={{ fontSize: 22, color: colors.red }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ReactNativeModal
      onBackdropPress={closeModal}
      isVisible={isOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={styles.childContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chia sẻ lịch tuần</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.headerCancel}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TouchableOpacity
            style={isActive(TAB.LIST) ? styles.tabActive : styles.tabDeactive}
            onPress={() => setCurrentTab(TAB.LIST)}
          >
            <Text style={isActive(TAB.LIST) ? styles.txtActive : styles.txtDeactive}>
              Danh sách
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isActive(TAB.CHOOSED) ? styles.tabActive : styles.tabDeactive}
            onPress={() => setCurrentTab(TAB.CHOOSED)}
          >
            <Text style={isActive(TAB.CHOOSED) ? styles.txtActive : styles.txtDeactive}>
              Đã chọn
            </Text>
          </TouchableOpacity>
        </View>

        {currentTab === TAB.LIST && (
          <View style={{ flex: 1 }}>
            <View style={styles.searchWrapper}>
              <Icon name="search" type="Feather" style={styles.searchIcon} />
              <TextInput
                style={styles.searchText}
                placeholder="Gõ tên/email/đơn vị/chức danh để bắt đầu tìm kiếm"
                onChangeText={text => setKeyword(text)}
              />
            </View>
            <FlatList
              data={userLoaded}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <GroupItemRow user={item} />}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 1, borderWidth: 0.5, marginVertical: 2, borderColor: '#eee' }}
                />
              )}
            />
          </View>
        )}
        {currentTab === TAB.CHOOSED && (
          <FlatList
            data={userChoosed}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <GroupItemRowChoosed user={item} />}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, borderWidth: 0.5, marginVertical: 2, borderColor: '#eee' }}
              />
            )}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <Button
            style={[
              { flex: 1, justifyContent: 'center' },
              styles.btn,
              userChoosed.length === 0 ? { backgroundColor: colors.gray } : {},
            ]}
            onPress={share}
            disabled={userChoosed.length === 0}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {userChoosed.length > 0 ? `(${userChoosed.length})` : ''} Xác nhận
            </Text>
          </Button>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalShareCalendar;
