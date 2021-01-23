import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Spinner, Text } from 'native-base';

import { DOWNLOAD_TYPES } from 'eoffice/constants/common';
import FileIcon from 'eoffice/components/FileIcon';
import { formatDate } from 'eoffice/utils/utils';
import colors from 'eoffice/utils/colors';
import useDownload from 'eoffice/utils/useDownload';

export const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
  },
  iconWrap: {
    backgroundColor: colors.lighterGray,
    borderRadius: 8,
    width: 45,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: colors.blue,
    fontSize: 25,
    marginTop: 0,
    paddingRight: 0,
  },
  textWrap: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.darkGray,
  },
  date: {
    fontSize: 15,
    color: colors.gray,
  },
  spinner: {
    height: null,
    marginRight: 10,
  },
});

const Attachment = ({ fileExtention, fileName, id, updateTime }) => {
  const [dlState, startDownload] = useDownload({
    attachmentId: id,
    fileName,
    open: true,
    type: DOWNLOAD_TYPES.ORIGINAL,
  });

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={startDownload}
      disabled={dlState.downloading || dlState.opening}
    >
      <View style={styles.iconWrap}>
        <FileIcon ext={fileExtention} style={styles.icon} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.name} numberOfLines={1}>
          {fileName}
        </Text>
        <Text style={styles.date}>{formatDate(new Date(updateTime))}</Text>
      </View>
      {(dlState.downloading || dlState.opening) && <Spinner size="small" style={styles.spinner} />}
    </TouchableOpacity>
  );
};

Attachment.propTypes = {
  fileExtention: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateTime: PropTypes.number.isRequired,
};

export default Attachment;
