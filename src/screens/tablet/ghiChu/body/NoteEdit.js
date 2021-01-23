import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import FileComponent from './FileComponent';
import { deleteObject, TYPE } from '../../../../store/ghiChu/reducer';

let currentIndex = 0;
let countObject = 0;

const TextComponent = ({ value, index, setData }) => {
  const [input, setInput] = useState(value);

  useEffect(
    () => {
      setInput(value);
    },
    [value]
  );

  return (
    <TextInput
      placeholder="Ghi chú..."
      autoFocus={true}
      value={input}
      onFocus={() => {
        currentIndex = index;
      }}
      multiline={true}
      onChangeText={text => {
        setData(index, text);
        setInput(text);
      }}
    />
  );
};

const NoteEdit = ({ currentNote, deleteObject }) => {
  const [tempNote, setTempNote] = useState(currentNote);

  useEffect(
    () => {
      if (currentNote && currentNote.dataJson) {
        const data = currentNote.dataJson
        if (typeof data == 'string') {
          const temp = {
            ...currentNote,
            dataJson: JSON.parse(data)
          }
          setTempNote(temp)
        } else {
          setTempNote(currentNote);
        }
      }
    },
    [currentNote]
  );

  function deleteTextInput(nativeEvent) {
    if (nativeEvent.key === 'Backspace') {
      if (tempNote.dataJson[index].value === null || tempNote.dataJson[index].value === '') {
        if (index !== countObject && index !== 0) {
          if (tempNote.dataJson.length >= 1) {
            // deleteObject(index);
          }
        } else {
          if (tempNote.dataJson.length === 2) {
            // deleteObject(index);
          }
        }
      }
    }
  }

  function setData(index, value) {
    tempNote.dataJson[index].value = value;
  }

  countObject = tempNote?.dataJson.length;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {tempNote &&
          tempNote.dataJson.map((item, index) => {
            switch (item.type) {
              case TYPE.TEXT_INPUT:
                return (
                  <TextComponent
                    value={tempNote.dataJson[index].value}
                    index={index}
                    setData={setData}
                  />
                );
              default:
                return <FileComponent  object={tempNote.dataJson[index]} deleteObject={deleteObject} />;
            }
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 16,
  },

  viewHolder: {
    height: 55,
    backgroundColor: '#26A69A',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  btnLeft: {
    position: 'absolute',
    left: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
  },
  btn: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
  },

  textInput: {
    padding: 16,
    margin: 10,
  },

  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  file: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'gainsboro',
    borderRadius: 8,
    marginTop: 10,
  },
  fileText: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  img: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: -5,
    top: 0,
  },
  icon: {
    width: 64,
    height: 64,
  },
  displayImg: {
    width: '100%',
    height: undefined,
  },
});

export default NoteEdit;
