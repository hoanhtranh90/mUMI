import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { addNewNote, findNoteById, loadListNote } from '../../../../store/ghiChuV2/reducer';
import colors from '../../../../utils/colors';
import format from 'date-fns/format';
import ListEmptyComponent from '../../../../components/ListEmptyComponent';
import InputIcon from '../../../../components/InputIcon';
import NavigationService from '../../../../utils/NavigationService';
import IconButton from 'eoffice/components/IconButton';
import { selectors } from '../../../../store/auth';

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.lightBlue,
  },
  itemRow: {
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 10,
    position: 'relative',
  },
  icon: { color: colors.darkGray, fontSize: 22 },
  icon2: { color: colors.darkGray, fontSize: 18, marginRight: 5 },
  iconBtnRight: {
    marginLeft: 10,
    padding: 6,
  },
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

const ListNote = ({
  listNote,
  query,
  loadListNote,
  noteDetail,
  findNoteById,
  currentUserDeptRole,
  addNewNote,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [tagSearch, setTagSearch] = useState('');
  const [widthTag, setWidthTag] = useState(0);
  const inputRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [keySearch, setKeySearch] = useState('');

  useEffect(
    () => {
      setRefreshing(false);
    },
    [listNote]
  );

  useEffect(
    () => {
      loadData();
      if (keySearch || tagSearch) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    },
    [keySearch, tagSearch, currentUserDeptRole]
  );

  function initNoteWithCalendar() {
    const initCalendar = navigation.getParam('initCalendar', null);
    if (initCalendar) {
      addNewNote(initCalendar);
      navigation.state.params = null;
    }
  }

  function initNote() {
    const initId = navigation.getParam('id', '');
    if (initId) {
      findNoteById(initId);
      navigation.state.params = null;
    }
  }

  const loadData = async () => {
    let queryState = query || {};
    queryState.sort = 'updateTime,desc';
    queryState.size = 1000;
    queryState.title = keySearch;
    if (tagSearch === 'shared') {
      queryState.isShare = 1;
    } else if (tagSearch === 'mine') {
      queryState.isShare = 0;
    } else delete queryState.isShare;
    await loadListNote(queryState);
    initNoteWithCalendar();
    initNote();
  };

  const getSubData = item => {
    let dataJson = typeof item.dataJson === 'string' ? JSON.parse(item.dataJson) : item.dataJson;
    return dataJson[0].value;
  };

  const NoteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => findNoteById(item.id)}
      style={[styles.itemRow, item.id === noteDetail?.id ? styles.active : {}]}
    >
      {item.isShare === 1 && (
        <Icon
          type="MaterialCommunityIcons"
          name="account-circle"
          style={{ top: 10, left: 2, color: colors.darkGray, fontSize: 14, position: 'absolute' }}
        />
      )}
      <View>
        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: 'bold' }}>
          {item.title || getSubData(item) || 'Ghi chú mới'}
        </Text>
        <View style={{ height: 6 }} />
        <Text numberOfLines={1}>
          {format(new Date(item.createTime), 'dd/MM/yy')}{' '}
          <Text style={{ color: '#aaa', marginLeft: 10 }}>{getSubData(item)}</Text>
        </Text>
        {item.isShare === 1 && (
          <>
            <View style={{ height: 6 }} />
            <Text numberOfLines={1} style={{ color: '#aaa', fontSize: 13 }}>
              Chia sẻ bởi : {item.shareBy}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const chooseTag = tag => {
    setIsOpenDropdown(false);
    setTagSearch(tag);
    inputRef.current.blur();
  };

  const onKeyPress = e => {
    if (e.nativeEvent.key === 'Backspace') {
      if (keySearch.length === 0) {
        setTagSearch('');
        setWidthTag(0);
      }
    }
  };

  const removeTag = () => {
    setTagSearch('');
    setWidthTag(0);
  };

  const getLabelTag = () => {
    switch (tagSearch) {
      case 'shared':
        return 'Ghi chú được chia sẻ';
      case 'mine':
        return 'Ghi chú của tôi';
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 2, paddingTop: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={{
            borderWidth: 0,
            borderColor: '#f8f9fd',
          }}
          onPress={() => {
            NavigationService.goBack();
          }}
        />
        <Text style={styles.txtHeader}>Ghi chú</Text>
        {/*<TouchableOpacity style={[styles.iconBtnRight]}>*/}
        {/*  <Icon type="Feather" name="sidebar" style={styles.icon} />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <View style={{ position: 'relative', padding: 10, zIndex: 100 }}>
        <InputIcon
          ref={inputRef}
          iconName="search"
          onKeyPress={onKeyPress}
          showBtn={showBtn}
          removeTag={removeTag}
          inputStyle={{ paddingLeft: widthTag }}
          placeholder={!tagSearch ? 'Tìm kiếm' : ''}
          onChangeText={text => setKeySearch(text)}
          onFocus={() => setIsOpenDropdown(true)}
          onBlur={() => setIsOpenDropdown(false)}
        />
        {!!tagSearch && (
          <View
            onPress={() => inputRef.current.focus()}
            onLayout={event => {
              setWidthTag(event.nativeEvent.layout.width || 0);
            }}
            style={{
              position: 'absolute',
              left: 40,
              top: 16,
              backgroundColor: '#fff',
              borderRadius: 4,
              paddingHorizontal: 4,
            }}
          >
            <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
              <Text style={{ fontSize: 15 }}>{getLabelTag()}</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
        {isOpenDropdown && (
          <View
            style={{
              position: 'absolute',
              top: 45,
              width: '100%',
              left: 10,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <Text style={{ color: colors.gray, fontSize: 12, marginBottom: 5 }}>
              Gợi ý tìm kiếm
            </Text>

            <TouchableOpacity
              onPress={() => chooseTag('shared')}
              style={{ flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center' }}
            >
              <Icon type="MaterialCommunityIcons" name="account-circle" style={styles.icon2} />
              <Text style={{ color: colors.darkGray, fontSize: 13 }}>Ghi chú được chia sẻ</Text>
            </TouchableOpacity>
            <View style={{ height: 5 }} />
            <TouchableOpacity
              onPress={() => chooseTag('mine')}
              style={{ flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center' }}
            >
              <Icon type="MaterialCommunityIcons" name="book-variant" style={styles.icon2} />
              <Text style={{ color: colors.darkGray, fontSize: 13 }}>Ghi chú của tôi</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {listNote.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadData();
              }}
            />
          }
          data={listNote}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <NoteItem item={item} key={item.id} />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, borderWidth: 0.5, marginVertical: 0, borderColor: '#eee' }} />
          )}
        />
      )}
      {listNote.length === 0 && <ListEmptyComponent />}
    </View>
  );
};

const mapStateToProps = state => ({
  listNote: state.noteV2.listNote,
  query: state.noteV2.query,
  noteDetail: state.noteV2.noteDetail,
  currentUserDeptRole: selectors.deptRoleSelector(state),
});

const mapDispatchToProps = {
  loadListNote: loadListNote,
  findNoteById: findNoteById,
  addNewNote: addNewNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNote);
