import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Icon} from "native-base";
import {TYPE} from "../../../../store/ghiChu/reducer";
import FileViewer from 'react-native-file-viewer';
import {format} from "date-fns";
import FileView from "../component/FileView";
import ImageView from "../component/ImageView";
import CalendarLinkView from "../component/CalendarLinkView";


const FileComponent = ({noteId ,object, deleteObject}) => {

  return (
      <View style={styles.file}>
        {object.type === TYPE.FILE && <FileView noteId={noteId} object={object}></FileView>}
        {object.type === TYPE.IMAGE && <ImageView noteId={noteId} object={object}></ImageView>}
        {object.type === TYPE.CALENDAR && <CalendarLinkView noteId={noteId} object={object}></CalendarLinkView>}

        <TouchableOpacity
          style={styles.img}
          onPress={() => deleteObject(object)}>
          <Icon name="closecircle" type="AntDesign" style={{
            fontSize: 18,
            color: 'red',
          }} />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({

  text: {
    color: 'black',
    fontSize: 15,
  },

  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  file: {
    flex: 1,
    padding: 16,
    backgroundColor: 'whitesmoke',
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
    top: -5,
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

export default FileComponent;

