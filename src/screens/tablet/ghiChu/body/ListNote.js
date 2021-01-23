import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomIcon from "../../ghiChuV2/components/CustomIcon";
import NavigationService from "../../../../utils/NavigationService";
import { connect } from 'react-redux';
import {selectNote, changeScreen, loadAllNotes,selectNoteById} from '../../../../store/ghiChu/reducer';
import {Icon} from "native-base";
import {format} from "date-fns";
import ModalSearch from "../../lichTuan/component/ModalSearch";
import {vi} from "date-fns/locale";


function getLastMonth() {
  const currentDate = new Date()
  const lastMonth = new Date().setDate(new Date().getDate() - 30)
  return `${format(lastMonth, 'dd/MM/yyyy')} - ${format(currentDate,'dd/MM/yyyy')}`
}

const NoteCell = ({item, index, selectNote}) => {
  let title = item.title
  if (title === null || title === '') {
    if (item.dataJson[0].value === "") {
      title = "Ghi chú mới"
    } else {
      title = item.dataJson[0].value
    }
  }
  return (
    <TouchableOpacity onPress={() => selectNote(index)}>
      <View style={{padding: 10}}>
        <Text
          numberOfLines={1}
          style={[styles.title,{fontSize: 16}]}>
          {title}
        </Text>
        <Text style={[styles.content,{marginTop: 4}]}>{format(item.createTime,"EEEE',' dd/MM/yyyy HH:mm:ss",  { locale: vi })}</Text>
      </View>
    </TouchableOpacity>
  );
}

const ListNote = ({currentNote, listNote, selectNote, changeScreen, addNewNote, loadAllNotes,noteId,selectNoteById}) => {
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

  useEffect(() => {
    loadAllNotes({
      title: ''
    })
  },[])

  // useEffect(() => {
  //   listNote.length > 0 && noteId && selectNoteById(noteId)
  // },[noteId,listNote])

  const search = options => {
    setIsOpenModalSearch(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowTop}>
        <TouchableOpacity onPress={()=> NavigationService.goBack()}>
          <CustomIcon name="arrow-back" margin={0}></CustomIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeScreen}>
          <CustomIcon name="import-export" margin={0}></CustomIcon>
        </TouchableOpacity>
      </View>

      <View style={[styles.rowTop,{marginLeft: 10, paddingBottom: 10, marginTop: 30}]}>
        <Text style={[styles.title, styles.largeTitle]}>Ghi chú</Text>
        {currentNote === null &&
          <View style={styles.rowTop}>
            <View style={[styles.btnBorder,{marginRight: 20}]}>
              <View style={styles.rowTop}>
                <Icon name="calendar" type="EvilIcons" style={{ fontSize: 20, color: '#007aff' }} />
                <Text style={[styles.title, { fontSize: 16, color: '#007aff' }]}>{getLastMonth()}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => setIsOpenModalSearch(val => !val)}>
              <Icon name="search" type="Octicons" style={{ fontSize: 20, color: '#007aff', marginRight: 20 , paddingTop: 3}} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addNewNote('')}>
              <CustomIcon name="add-circle-outline" margin={0}></CustomIcon>
            </TouchableOpacity>
          </View>
        }
      </View>

      <View style={styles.line}></View>
      <FlatList
        data={listNote}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => <NoteCell item={item} index={index} selectNote={selectNote}></NoteCell>}
      ></FlatList>

      <ModalSearch
        isOpen={isOpenModalSearch}
        toggleIsOpen={flag => setIsOpenModalSearch(flag)}
        search={search}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRightWidth: 0.5,
    borderColor: '#ccc',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 22,
    color: '#0088ff',
  },

  titleEmpty: {
    fontWeight: 'bold',
    color: 'gray',
  },

  largeTitle: {fontSize: 25},

  title: {
    fontWeight: 'bold',
    color: '#0088ff',
  },

  content: {
    fontSize: 14,
    color: 'black',
  },
  btnBorder: {
    marginLeft: 2,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: '#ccc',
  },
});

const mapStateToProps = ({note}) => ({
  listNote: note.listNote,
  currentNote: note.currentNote,
});

const mapDispatchToProps = {
  selectNote: selectNote,
  changeScreen: changeScreen,
  loadAllNotes: loadAllNotes,
  selectNoteById: selectNoteById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNote);
