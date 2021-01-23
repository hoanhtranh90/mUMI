import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Text } from 'native-base';

import colors from 'eoffice/utils/colors';
import Attachment from './Attachment';

const Attachments = ({ attachments, listAttachments }) => {
  useEffect(() => {
    listAttachments();
  }, []);

  return (
    <FlatList
      contentContainerStyle={{ paddingLeft: 5 }}
      data={attachments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Attachment {...item} />}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListEmptyComponent={
        <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
          Không có file đính kèm
        </Text>
      }
    />
  );
};

Attachments.propTypes = {
  listAttachments: PropTypes.func.isRequired,

  attachments: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};
Attachments.defaultProps = {
  attachments: [],
  loading: false,
};

export default Attachments;
