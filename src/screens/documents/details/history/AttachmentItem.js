import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'native-base';

import FileIcon from 'eoffice/components/FileIcon';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fileIcon: {
    fontSize: 24,
    color: colors.blue,
    paddingRight: 12,
  },
  fileName: {
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: 'bold',
    flex: 1,
  },
  removeIcon: {
    color: colors.red,
    marginRight: 0,
    fontSize: 16,
  },
});

const AttachmentItem = ({ extension, name, onRemove }) => (
  <View style={styles.wrapper}>
    <FileIcon ext={extension} style={styles.fileIcon} />
    <Text style={styles.fileName} numberOfLines={1}>
      {name}
    </Text>
    <TouchableOpacity onPress={onRemove}>
      <Icon name="x-circle" style={styles.removeIcon} />
    </TouchableOpacity>
  </View>
);

AttachmentItem.propTypes = {
  name: PropTypes.string.isRequired,

  extension: PropTypes.string,
  onRemove: PropTypes.func,
};
AttachmentItem.defaultProps = {
  extension: '',
  onRemove: null,
};

export default AttachmentItem;
