import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import useDownloadV2 from '../../../../utils/useDownloadV2';
import FileViewer from "react-native-file-viewer";

const ImageView = ({ noteId, object }) => {
  const [imageData, setImageData] = useState(null);
  const [aspectRatio, setRatio] = useState(1.5)
  const { state, downloadAttachmentForNote } = useDownloadV2({ isOpen: false });
  const attachmentId = object.value

  const loadImage = () => downloadAttachmentForNote({ noteId, attachmentId });

  useEffect(() => {
    let isMounted = true;
    if (attachmentId) {
      loadImage().then(data => {
        if (isMounted) {
          if (data) {
            setImageData(data.res);
            if (data.res && data.res.path()) {
              Image.getSize(data.res.path(), ((width, height) => {
                setRatio(width/height)
              }))
            }
          }
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [attachmentId]);

  function openFile() {
    if (imageData) {
      FileViewer.open(imageData.path())
    }
  }

  return (
    <View>
      {imageData && imageData.path() && (
        <TouchableOpacity onPress={() => openFile()}>
          <Image style={{ width: '100%', height: undefined, aspectRatio: aspectRatio }} source={{ uri: imageData.path() }} />
        </TouchableOpacity>
      )}
      {state.downloading && <ActivityIndicator />}
    </View>
  );
};

export default ImageView;
