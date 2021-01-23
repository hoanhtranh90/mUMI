import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Text, View } from 'native-base';
import {
  addNewNote,
  findNoteById,
  reset,
  updateNoteOnClient,
  insertNoteClient,
} from '../../../../store/ghiChuV2/reducer';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import colors from '../../../../utils/colors';
import EditableNote from './EditableNote';
import Footer from './Footer';
import { NavigationEvents } from 'react-navigation';
import DetailHeader from './DetailHeader';
import debounce from 'lodash/debounce';

const DetailNote = ({
  noteDetail,
  findNoteById,
  updateNoteOnClient,
  insertNoteClient,
  navigation,
}) => {
  const titleRef = useRef(null);

  let insertNoteClient_ = () => {
    insertNoteClient();
  };

  useEffect(() => {
    insertNoteClient_ = debounce(insertNoteClient_, 1000);
  },[]);

  const changeTitle = text => {
    updateNoteOnClient({ ...noteDetail, title: text });
  };

  const deleteObject = async idx => {
    let dataJson = noteDetail.dataJson.filter((item, index) => index !== idx);
    await updateNoteOnClient({ ...noteDetail, dataJson });
    insertNoteClient();
  };

  const onDataChange = (index, value) => {
    let dataJson = noteDetail.dataJson;
    let data = dataJson[index];
    data.value = value;
    updateNoteOnClient({ ...noteDetail, dataJson });
    // insertNoteClient_();
  };

  const addMore = async options => {
    let dataJson = noteDetail.dataJson;
    if (dataJson.findIndex(data => data.value === options.value) === -1) dataJson.push(options);
    await updateNoteOnClient({ ...noteDetail, dataJson });
    insertNoteClient();
  };

  return (
    <>
      <NavigationEvents onWillFocus={() => {}} />
      <View
        style={{
          flex: 5,
          borderLeftWidth: 0.5,
          borderLeftColor: '#ccc',
          backgroundColor: '#fff',
          paddingTop: 15,
        }}
      >
        <DetailHeader noteDetail={noteDetail} />
        {noteDetail !== null && (
          <ScrollView>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ color: colors.gray, fontSize: 15 }}>
                  {noteDetail && noteDetail.createTime
                    ? format(new Date(noteDetail.createTime), "'Ngày' dd/MM/yyyy 'lúc' HH:mm")
                    : format(new Date(), 'dd/MM/yyyy HH:mm')}
                </Text>
              </View>
              <TextInput
                multiline
                maxLength={200}
                ref={titleRef}
                value={noteDetail?.title}
                onEndEditing={insertNoteClient}
                onChangeText={changeTitle}
                placeholder="Tiêu đề"
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderBottomWidth: 0.5,
                  paddingBottom: 5,
                  borderBottomColor: '#ccc',
                  marginBottom: 10,
                }}
              />
              <EditableNote
                dataJson={noteDetail.dataJson}
                noteId={noteDetail.id}
                insertNoteClient={insertNoteClient}
                onDataChange={onDataChange}
                deleteObject={deleteObject}
              />
              <View />
            </View>
          </ScrollView>
        )}
        {noteDetail !== null && (
          <View>
            <Footer addMore={addMore} />
          </View>
        )}
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  noteDetail: state.noteV2.noteDetail,
});

const mapDispatchToProps = {
  findNoteById: findNoteById,
  updateNoteOnClient: updateNoteOnClient,
  reset: reset,
  addNewNote: addNewNote,
  insertNoteClient: insertNoteClient,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailNote);
