import {
  StyleSheet,
  SectionList,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform, FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';
import colors from 'eoffice/utils/colors';
import Checkbox from 'eoffice/components/Checkbox';
import format from 'date-fns/format';

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
});

const SelectedModal = ({ isOpen, closeModal, submit, list, type }) => {
  const [listChecked, setListChecked] = useState([]);
  let title = '';

  if (type === 'CHUTRI') {
    title = 'Đơn vị chủ trì';
  } else if (type === 'PHOIHOP') {
    title = 'Đơn vị phối hợp'
  } else {
    title = 'Văn bản liên quan'
  }
  const isChecked = item => {
    const itemChecked = listChecked.find(o => o.id === item.id);
    return !!itemChecked;
  };

  const checked = item => {
    if (isChecked(item)) {
      setListChecked(val => val.filter(i => i.id !== item.id));
    } else setListChecked(val => [...val, item]);
  };

  const GroupItemRow = ({ item }) => (
    <TouchableOpacity onPress={() => checked(item)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{item.deptName}</Text>
        <Text style={[styles.positionText]}>{item.parentName}</Text>
      </View>
      <Checkbox checked={isChecked(item)} />
    </TouchableOpacity>
  );

  const GroupItemVB = ({ item }) => (
    <TouchableOpacity onPress={() => checked(item)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{item.quote}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={[styles.positionText]}>{item.docCode}</Text>
          <Text style={[styles.positionText]}>{format(item.docDate ? new Date(item.docDate) : new Date(), 'dd/MM/yyyy')}</Text>
        </View>
      </View>
      <Checkbox checked={isChecked(item)} />
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.headerCancel}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
           return type === 'VANBAN' ? <GroupItemVB key={item.id} item={item}/> : <GroupItemRow key={item.id} item={item}/>
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, borderWidth: 0.5, marginVertical: 2, borderColor: '#eee' }}
            />
          )}
        />
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
              listChecked.length === 0 ? { backgroundColor: colors.gray } : {},
            ]}
            onPress={() => {
              submit({listChecked})
            }}
            disabled={listChecked.length === 0}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {listChecked.length > 0 ? `(${listChecked.length})` : ''} Xác nhận
            </Text>
          </Button>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default SelectedModal;
