import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Icon, Text } from 'native-base';

import FileIcon from 'eoffice/components/FileIcon';
import colors from 'eoffice/utils/colors';

const AttachmentItem = ({ extension, name, onRemove }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
    <FileIcon ext={extension} style={{ fontSize: 24, color: colors.blue, paddingRight: 12 }} />
    <Text
      style={{
        fontSize: 14,
        color: colors.darkGray,
        fontWeight: 'bold',
        flex: 1,
      }}
      numberOfLines={1}
    >
      {name}
    </Text>
    <Button icon transparent small onPress={onRemove}>
      <Icon name="x-circle" style={{ color: colors.red, marginRight: 0 }} />
    </Button>
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
