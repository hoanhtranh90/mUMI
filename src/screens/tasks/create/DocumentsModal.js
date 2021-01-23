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
import {findAllDocuments} from '../../../store/tasks/detail/service';
import ModeSwitches from "../../../components/ModeSwitches";
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
const modes = [
  {
    label: 'Văn bản đến',
    value: DOCUMENT_TYPE.VB_DEN,
  },
  {
    label: 'Văn bản đi',
    value: DOCUMENT_TYPE.VB_DI,
  },
];
const DocumentsModal = ({ isOpen, closeModal, submit }) => {
  const [listVBDen, setListVBDen] = useState([]);
  const [listVBDi, setListVBDi] = useState([]);
  const [mode, setMode] = useState(DOCUMENT_TYPE.VB_DEN);
  const [listChecked, setListChecked] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setPage(0);
  },[mode])

  useEffect(()=>{
    getDocuments()
  },[keyword, page]);



  const isChecked = item => {
    const itemChecked = listChecked.find(o => o.id === item.id);
    return !!itemChecked;
  };

  async function getDocuments(){
    const listDocuments = await findAllDocuments(mode,keyword, page)
    if (page === 0) {
      mode === DOCUMENT_TYPE.VB_DEN ?
        setListVBDen(listDocuments) : setListVBDi(listDocuments)
    } else {
      let list = mode === DOCUMENT_TYPE.VB_DEN ? listVBDen : listVBDi
      const newList = list.concat(listDocuments)
      mode === DOCUMENT_TYPE.VB_DEN ?
        setListVBDen(newList) : setListVBDi(newList)
    }
  }
  const checked = item => {
    if (isChecked(item)) {
      setListChecked(val => val.filter(i => i.id !== item.id));
    } else setListChecked(val => [...val, item]);
  };

  const GroupItemRow = ({ item }) => (
    <TouchableOpacity onPress={() => checked(item)} style={styles.row}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={[styles.nameText, styles.txtBold]}>{item.quote}</Text>
        <Text style={[styles.positionText]}>{format(new Date(item.createTime), 'dd/MM/yyyy')}</Text>
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
          <Text style={styles.headerTitle}>Danh sách văn bản</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.headerCancel}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchWrapper}>
          <Icon name="search" type="Feather" style={styles.searchIcon} />
          <TextInput
            style={styles.searchText}
            placeholder="Nhập trích yếu/Số kí hiệu để tìm kiếm"
            onChangeText={text => setKeyword(text)}
          />
        </View>
        <ModeSwitches modes={modes} onChange={setMode} current={mode}/>
        {mode === DOCUMENT_TYPE.VB_DEN &&
        <FlatList
          data={listVBDen}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroupItemRow key={item.id} item={item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, borderWidth: 0.5, marginVertical: 2, borderColor: '#eee' }}
            />
          )}
          onEndReachedThreshold={0.3}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          onEndReached={() => {
            setPage(page + 1)
          }}
        />}

        {mode === DOCUMENT_TYPE.VB_DI &&
        <FlatList
          data={listVBDi}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroupItemRow key={item.id} item={item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, borderWidth: 0.5, marginVertical: 2, borderColor: '#eee' }}
            />
          )}
          onEndReachedThreshold={0.3}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          onEndReached={() => {
            setPage(page + 1)
          }}
        />}
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

export default DocumentsModal;
