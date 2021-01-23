import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import useDownloadV2 from '../../../../utils/useDownloadV2';
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from 'react-native-file-viewer';

const FileView = ({ noteId, object }) => {
  const [data, setData] = useState(null);
  const [size, setFileSize] = useState(0)
  const { state, downloadAttachmentForNote } = useDownloadV2({ isOpen: false });

  const attachmentId = object.value
  const imgDisplay = require('../../../../assets/folder.png')

  const loadData = () => downloadAttachmentForNote({ noteId, attachmentId });

  useEffect(() => {
    let isMounted = true;
    if (attachmentId) {
      loadData().then(data => {
        if (isMounted) {
          if (data) {
            setData(data);
            RNFetchBlob.fs.stat(data.res.path()).then(data => {
              setFileSize(data.size)
            })
          }
        }
      });
    }
    return () => {
      isMounted = false
    };
  }, [attachmentId]);

  function openFile() {
    if (data && data.res.path()) {
      FileViewer.open(data.res.path())
    }
  }

  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  return (
    <View>
      {data && data.attachment && (
        <TouchableOpacity onPress={() => openFile()}>
          <View style={styles.container}>

            <View style={styles.fileText}>
              <Text style={styles.title}>{data.attachment.fileName}</Text>
              <Text style={styles.text}>{bytesToSize(size)}</Text>
            </View>

            <Image
              style={styles.icon}
              source={imgDisplay}
            />
          </View>
        </TouchableOpacity>
      )}
      {state.downloading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fileText: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  icon: {
    width: 64,
    height: 64,
  },
});

export default FileView;
