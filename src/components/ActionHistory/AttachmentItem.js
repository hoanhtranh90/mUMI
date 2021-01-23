import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner, Text } from 'native-base';

import colors from 'eoffice/utils/colors';
import useDownload from 'eoffice/utils/useDownload';
import FileIcon from '../FileIcon';
import { DOWNLOAD_TYPES } from '../../constants/common';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fileIcon: {
    fontSize: 24,
    color: colors.blue,
    paddingRight: 12,
  },
  text: {
    fontSize: 14,

    fontWeight: 'bold',
    flex: 1,
  },
  spinner: {
    position: 'absolute',
    right: 0,
  },
});

const AttachmentItem = ({ canDownload, extension, id, name }) => {
  const [dlState, startDownload] = useDownload({
    attachmentId: id,
    fileName: name,
    open: true,
    type: DOWNLOAD_TYPES.ORIGINAL,
  });

  return (
    <TouchableOpacity
      disabled={!canDownload || dlState.downloading || dlState.opening}
      style={styles.btn}
      onPress={startDownload}
    >
      <FileIcon ext={extension} style={styles.fileIcon} />
      <Text
        style={[styles.text, { color: canDownload ? colors.blue : colors.darkGray }]}
        numberOfLines={1}
      >
        {name}
      </Text>
      {(dlState.downloading || dlState.opening) && <Spinner size="small" style={styles.spinner} />}
    </TouchableOpacity>
  );
};

AttachmentItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  canDownload: PropTypes.bool,
  extension: PropTypes.string,
};
AttachmentItem.defaultProps = {
  canDownload: true,
  extension: '',
};

export default AttachmentItem;
