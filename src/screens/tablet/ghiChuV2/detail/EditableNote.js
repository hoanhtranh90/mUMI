import React from 'react';
import { TextInput } from 'react-native';
import { View } from 'native-base';
import { NOTE_DATA_TYPE as TYPE } from '../../../../constants/common';
import FileComponent from '../../ghiChu/body/FileComponent';
import { insertNoteClient } from '../../../../store/ghiChuV2/reducer';

const EditableNote = ({ noteId, dataJson, onDataChange, deleteObject,insertNoteClient }) => {

  return (
    <View>
      {dataJson.map((data, index) => {
        switch (data.type) {
          case TYPE.TEXT_INPUT:
            return (
              <TextInput
                key={index}
                multiline
                onEndEditing={insertNoteClient}
                scrollEnabled={false}
                value={data.value}
                onChangeText={text => onDataChange(index, text)}
                placeholder="Nội dung"
                style={{
                  flex: 1,
                  fontSize: 16,
                }}
              />
            );
          case TYPE.FILE:
          case TYPE.IMAGE:
          case TYPE.CALENDAR:
            return (
              <FileComponent
                noteId={noteId}
                key={index}
                object={data}
                deleteObject={() => deleteObject(index)}
              />
            );
        }
      })}
    </View>
  );
};

export default EditableNote;
