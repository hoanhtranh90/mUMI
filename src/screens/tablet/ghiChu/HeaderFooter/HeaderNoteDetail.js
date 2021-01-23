import { StyleSheet, TouchableOpacity, View, Alert, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomIcon from "../../ghiChuV2/components/CustomIcon";
import {TYPE} from "../../../../store/ghiChu/reducer";

const HeaderNoteDetail = (
{
  currentNote,
  saveDataNote,
  deleteNote,
  changeTitleCurrentNote,
  createNoteAPI,
  deleteNoteAPI,
  editNoteAPI,
  addNewNote,
}) =>
{
  const confirmDialog = () =>
    Alert.alert(
      "Xoá ghi chú",
      "Bạn chắc chắn muốn xoá ghi chú này?",
      [
        {
          text: "Huỷ",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Xoá",
          onPress: () => {
            if (typeof currentNote.id == 'number') {
              deleteNote()
            } else {
              deleteNoteAPI(currentNote.id)
            }
          },
          style: "destructive",
        }
      ],
      { cancelable: false }
    );

  const [topTitle, changeTitle] = useState(currentNote.title)

  useEffect(()=>{
    changeTitle(currentNote.title)
  },[currentNote])

  return (
    <View style={styles.container}>
      {/*<Text style={styles.titleBold}>{title}</Text>*/}
      <View style={{flex: 1}}>
        <TextInput
          placeholder="Tiêu đề"
          style={styles.titleBold}
          autoFocus={true}
          value={topTitle}
          onChangeText={(text) => {
            changeTitleCurrentNote(text)
            changeTitle(text)
          }}
        />
      </View>
      <View style={[styles.row, {marginLeft: 10, marginRight: 10}]}>
        <TouchableOpacity onPress={() => addNewNote('')}>
          <CustomIcon name="add-circle-outline" margin={10}></CustomIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          confirmDialog()
        }}>
          <CustomIcon name="delete" margin={10}></CustomIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (typeof currentNote.id == 'number') {
            createNoteAPI(getFormUpload(currentNote))
          } else {
            editNoteAPI(getFormUpload(currentNote), currentNote.id)
          }
          saveDataNote();
        }}>
          <CustomIcon name="mode-edit" margin={0}></CustomIcon>
        </TouchableOpacity>
      </View>
    </View>
  );

  function getFormUpload(currentNote) {
    let uploadForm = {};
    uploadForm.title = currentNote.title
    let temp = currentNote.dataJson
    temp.forEach((item,index, array) => {
      switch (item.type) {
        case TYPE.TEXT_INPUT:
          array[index] = {
            ...item,
            customOrder: index,
          }
          break
        case TYPE.IMAGE:
          array[index] = {
            type: TYPE.IMAGE,
            value: item.value,
            customOrder: index
          }
          break
        case TYPE.FILE:
          array[index] = {
            type: TYPE.FILE,
            value: item.value,
            customOrder: index
          }
          break
        case TYPE.CALENDAR:
          array[index] = {
            type: TYPE.CALENDAR,
            value: item.value,
            customOrder: index
          }
          break
      }
      uploadForm.dataJson = temp
    })
    return uploadForm
  }
}

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 25,
    color: '#0088ff',
  },
  titleBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default HeaderNoteDetail;
