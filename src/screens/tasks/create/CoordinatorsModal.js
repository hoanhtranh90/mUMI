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
import colors from '../../../utils/colors';
import _ from 'lodash';
import Checkbox from 'eoffice/components/Checkbox';
import {DOCUMENT_TYPE} from '../../../constants/documents';
import {findAllCoordinatorsForTask} from '../../../store/tasks/detail/service';
import {format} from "date-fns";

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

const CoordinatorsModal = ({ isOpen, closeModal, submitCoordinators }) => {
  const [list, setList] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  const isChecked = item => {
    const itemChecked = listChecked.find(o => o.id === item.id);
    return !!itemChecked;
  };

  useEffect(()=>{
    getListCoordinators()
  },[]);

  async function getListCoordinators(){
    const lstCoordinators = await findAllCoordinatorsForTask()
    setList(lstCoordinators)
  }
  const checked = item => {
    if (isChecked(item)) {
      setListChecked(val => val.filter(i => i.id !== item.id));
    } else setListChecked(val => [...val, item]);
  };

  const GroupItemRow = ({ item }) => (
    <TouchableOpacity onPress={() => checked(item)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{item.fullName}</Text>
        <Text style={[styles.positionText]}>{`${item.positionName} - ${item.deptName}`}</Text>
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
          <Text style={styles.headerTitle}>Thêm người phối hợp</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.headerCancel}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroupItemRow key={item.id} item={item} />}
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
              submitCoordinators({listChecked})
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

export default CoordinatorsModal;
