import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, View } from 'native-base';
import colors from 'eoffice/utils/colors';
import { addNewNote, deleteNote, editNote, insertNote } from '../../../../store/ghiChuV2/reducer';
import { connect } from 'react-redux';
import ModalShareNote from '../components/ModalShareNote';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  iconBtnLeft: {
    marginRight: 10,
    padding: 6,
  },
  iconBtnRight: {
    marginLeft: 10,
    padding: 6,
  },
  icon: { color: colors.blue, fontSize: 22 },
  icon2: { color: colors.blue, fontSize: 18, marginRight: 5 },
});

const DetailHeader = ({ deleteNote, noteDetail, addNewNote }) => {
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);

  const onDeleteNote = () => {
    Alert.alert('Bạn có muốn xóa ghi chú này không ?', '', [
      {
        text: 'Đồng ý',
        onPress: () => deleteNote(noteDetail.id),
        style: 'default',
      },
      {
        text: 'Huỷ',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  const isDisable = () => {
    return noteDetail && typeof noteDetail.id === 'number' && !isHasData(noteDetail);
  };

  const isHasData = noteDetail => {
    const dataJsonAny = noteDetail.dataJson.find(data => !!data.value);
    return !!noteDetail.title || !!dataJsonAny;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconBtnRight}
        disabled={!noteDetail || isDisable()}
        onPress={onDeleteNote}
      >
        <Icon
          type="Feather"
          name="trash-2"
          style={[styles.icon, !noteDetail || isDisable() ? { color: '#ccc' } : {}]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBtnRight}
        disabled={!noteDetail || isDisable()}
        onPress={() => setIsOpenModalShare(true)}
      >
        <Icon
          type="Feather"
          name="share"
          style={[styles.icon, !noteDetail || isDisable() ? { color: '#ccc' } : {}]}
        />
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.iconBtnLeft} onPress={saveNote}>*/}
      {/*  <Icon type="Feather" name="save" style={styles.icon} />*/}
      {/*</TouchableOpacity>*/}

      <TouchableOpacity style={styles.iconBtnRight} disabled={isDisable()} onPress={addNewNote}>
        <Icon
          type="Feather"
          name="edit-3"
          style={[styles.icon, isDisable() ? { color: '#ccc' } : {}]}
        />
      </TouchableOpacity>
      <ModalShareNote
        isOpen={isOpenModalShare}
        close={() => setIsOpenModalShare(false)}
        noteId={noteDetail?.id}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  noteDetail: state.noteV2.noteDetail,
});

const mapDispatchToProps = {
  insertNote: insertNote,
  deleteNote: deleteNote,
  editNote: editNote,
  addNewNote: addNewNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailHeader);
