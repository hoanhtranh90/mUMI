import {
  StyleSheet,
  SectionList,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';
import colors from '../../../../utils/colors';
import _ from 'lodash';
import Checkbox from 'eoffice/components/Checkbox';

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

const ModalLanhDao = ({ isOpen, closeModal, onSubmit, listLD, listLDChecked }) => {
  const [list, setList] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [listChecked, setListChecked] = useState([]);
  const [keyword, setKeyword] = useState('');

  //populate tree
  useEffect(
    () => {
      if (listLD && listLD.length > 0) {
        const tempGroup = _.groupBy(listLD, 'deptName');
        let tempGroupList = [];
        Object.keys(tempGroup).forEach(key => {
          tempGroupList.push({
            title: key,
            data: tempGroup[key],
          });
        });
        setList(tempGroupList);
        setListFilter(tempGroupList);
      }
    },
    [listLD]
  );
  //populate tree
  useEffect(
    () => {
      if (listLD && listLD.length > 0) {
        let listFilter = listLD;
        if (keyword) {
          listFilter = listLD.filter(
            ld =>
              ld.fullName.toUpperCase().includes(keyword.toUpperCase()) ||
              ld.deptName.toUpperCase().includes(keyword.toUpperCase()) ||
              ld.positionName.toUpperCase().includes(keyword.toUpperCase())
          );
        }
        const tempGroup = _.groupBy(listFilter, 'deptName');
        let tempGroupList = [];
        Object.keys(tempGroup).forEach(key => {
          tempGroupList.push({
            title: key,
            data: tempGroup[key],
          });
        });
        setListFilter(tempGroupList);
      }
    },
    [keyword]
  );

  useEffect(
    () => {
      if (listLD && listLD.length > 0) {
        setListChecked(listLDChecked);
      }
    },
    [listLDChecked]
  );

  const isChecked = item => {
    const itemChecked = listChecked.find(o => o.id === item.id);
    return !!itemChecked;
  };

  const isCheckedAll = deptName => {
    let ldInDept = list.find(item => item.title === deptName).data;
    let ldInDeptChecked = listChecked.filter(item => item.deptName === deptName);
    return ldInDept.length === ldInDeptChecked.length;
  };

  const checked = item => {
    if (isChecked(item)) {
      setListChecked(val => val.filter(i => i.id !== item.id));
    } else setListChecked(val => [...val, item]);
  };

  const checkedGroup = deptName => {
    let ldInDept = listFilter.find(item => item.title === deptName).data;
    let newList = [...listChecked];
    if (isCheckedAll(deptName)) {
      ldInDept.forEach(item => {
        let index = newList.findIndex(o => o.id === item.id);
        if (index !== -1) {
          newList.splice(index, 1);
        }
      });
    } else
      ldInDept.forEach(item => {
        let index = newList.findIndex(o => o.id === item.id);
        if (index === -1) {
          newList.push(item);
        }
      });
    setListChecked(newList);
  };

  const GroupHeader = ({ deptName }) => {
    return (
      <TouchableOpacity onPress={() => checkedGroup(deptName)} style={[styles.group, styles.row]}>
        <Text style={[styles.groupText, styles.txtBold]}>{deptName}</Text>
        <Checkbox checked={isCheckedAll(deptName)} />
      </TouchableOpacity>
    );
  };

  const submit = () => {
    onSubmit({ listChecked });
  };

  const GroupItemRow = ({ item }) => (
    <TouchableOpacity onPress={() => checked(item)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{item.fullName}</Text>
        <Text style={[styles.positionText]}>{item.positionName}</Text>
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
          <Text style={styles.headerTitle}>Danh sách lãnh đạo</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.headerCancel}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchWrapper}>
          <Icon name="search" type="Feather" style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Tên lãnh đạo"
            onChangeText={text => setKeyword(text)}
          />
        </View>
        <SectionList
          sections={listFilter}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <GroupItemRow key={item.id} item={item} />}
          renderSectionHeader={({ section: { title, data } }) => <GroupHeader deptName={title} />}
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
            onPress={submit}
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

export default ModalLanhDao;
