import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

import colors from 'eoffice/utils/colors';
import useModal from '../../utils/useModal';
import AttachmentItem from './AttachmentItem';
import ToUsersModal from './ToUsersModal';

const styles = StyleSheet.create({
  viewContainer: {
    padding: 12,
    backgroundColor: colors.lighterGray,
    borderBottomLeftRadius: 12,
  },
  text: { fontSize: 14, color: colors.darkGray, lineHeight: 14 * 1.43 },
  textUser: { fontSize: 14, color: colors.blue, fontWeight: 'bold' },
  view: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    marginTop: 10,
  },
});
const getToUsersName = toUsers => {
  if (toUsers.length === 1) {
    return `@${toUsers[0].toFullName || ''}`;
  }
  if (toUsers.length > 1) {
    return `@${toUsers[0].toFullName || ''} và ${toUsers.length - 1} người khác`;
  }
  return '';
};

const CommentItemContent = ({ item }) => {
  if (!item.content) {
    return null;
  }
  const hasToUsers = item.toUsers && item.toUsers.length > 0;
  const [isVisible, open, close] = useModal();

  return (
    <>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>
          {hasToUsers && (
            <Text style={styles.textUser} onPress={open}>
              {getToUsersName(item.toUsers)}
            </Text>
          )}
          {` ${item.content}`}
        </Text>

        {item.attachments?.length > 0 && (
          <View style={styles.view}>
            <FlatList
              data={item.attachments}
              keyExtractor={attachment => attachment.id}
              renderItem={({ item: attachment }) => (
                <AttachmentItem
                  id={attachment.id}
                  name={attachment.fileName}
                  extension={attachment.fileExtention}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
      </View>
      {hasToUsers && (
        <ToUsersModal
          isVisible={isVisible}
          onClose={close}
          toUsers={item.toUsers.map(toUser => ({
            id: toUser.toUserId,
            deptName: toUser.toDeptName,
            fullName: toUser.toFullName,
            positionName: toUser.toPositionName,
          }))}
        />
      )}
    </>
  );
};

CommentItemContent.propTypes = {
  item: PropTypes.shape({}),
};
CommentItemContent.defaultProps = {
  item: {},
};

export default CommentItemContent;
