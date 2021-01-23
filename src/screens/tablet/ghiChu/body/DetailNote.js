import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HeaderNoteDetail from '../HeaderFooter/HeaderNoteDetail';
import Footer from '../../ghiChuV2/detail/Footer';
import NoteEdit from './NoteEdit';
import { connect } from 'react-redux';
import {
  saveDataNote,
  deleteNote,
  changeTitleCurrentNote,
  addMore,
  deleteObject,
  createNoteAPI,
  deleteNoteAPI,
  editNoteAPI,
} from '../../../../store/ghiChu/reducer';

const DetailNote = ({
  currentNote,
  saveDataNote,
  deleteNote,
  openModal,
  changeTitleCurrentNote,
  addMore,
  deleteObject,
  createNoteAPI,
  deleteNoteAPI,
  editNoteAPI,
  addNewNote,
}) => {
  return currentNote ? (
    <View style={styles.container}>
      <HeaderNoteDetail
        currentNote={currentNote}
        saveDataNote={saveDataNote}
        createNoteAPI={createNoteAPI}
        deleteNoteAPI={deleteNoteAPI}
        deleteNote={deleteNote}
        editNoteAPI={editNoteAPI}
        addNewNote={addNewNote}
        changeTitleCurrentNote={changeTitleCurrentNote}
      />
      <NoteEdit
        currentNote={currentNote}
        deleteObject={deleteObject}
      />
      <Footer openModal={openModal} addMore={addMore} saveDataNote={saveDataNote} />
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  title: {
    fontWeight: 'bold',
    color: '#0088ff',
  },
});

const mapStateToProps = ({ note }) => ({
  currentNote: note.currentNote,
});

const mapDispatchToProps = {
  saveDataNote: saveDataNote,
  deleteNote: deleteNote,
  changeTitleCurrentNote: changeTitleCurrentNote,
  addMore: addMore,
  deleteObject: deleteObject,
  createNoteAPI: createNoteAPI,
  deleteNoteAPI: deleteNoteAPI,
  editNoteAPI: editNoteAPI,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailNote);
