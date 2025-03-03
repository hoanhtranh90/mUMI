import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FlatList, Keyboard, Platform, StyleSheet, View, Alert } from 'react-native';
import { Item, Text, Textarea, Spinner } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import { DOCUMENT_TYPE, OUTGOING_DOC_STATUS } from 'eoffice/constants/documents';
import useFileUpload from 'eoffice/utils/useFileUpload';
import AttachmentItem from './AttachmentItem';
import UserSelectModal from './UserSelectModal';
import UserSelectBtn from './UserSelectBtn';
import _ from 'lodash';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.lighterGray,
    left: 0,
    right: 0,
    flexDirection: 'column',
    paddingHorizontal: 15,
    ...Platform.select({
      android: {
        position: 'absolute',
        bottom: 0,
      },
    }),
  },
  btn: {
    backgroundColor: 'transparent',
    borderColor: colors.lightBlue,
    height: 36,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    marginRight: 4,
  },
  item: {
    height: 36,
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderRadius: 18,
  },
  textarea: {
    fontSize: 15,
    paddingLeft: 16,
    paddingRight: 10,
    paddingTop: 9,
    height: 36,
    flex: 1,
  },
  sendBtn: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    height: 36,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    marginLeft: 4,
  },
  loading: { flexDirection: 'row', paddingTop: 10 },
  loadingSpinner: { height: null },
  loadingText: { color: colors.gray, fontSize: 15, marginLeft: 10 },
});

const Footer = ({ addComment, document, mode, bccInfo, isAutoBccDuThao }) => {
  let modeStatus = null;
  if (global.hasDeeplink) {
    modeStatus = global.typeDocDetail;
  } else {
    modeStatus = mode;
  }
  let res;
  if (modeStatus === DOCUMENT_TYPE.VB_DI && document?.status === OUTGOING_DOC_STATUS.TAO_MOI) {
    return null;
  }

  const [submitting, setSubmitting] = useState('');
  const [content, setContent] = useState('');
  const [writing, setWriting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [state, actions] = useFileUpload({ objectType: ATTACHMENT_TYPES.COMMENT });
  const inputEl = useRef(null);

  const send = async () => {
    if (!content) {
      Alert.alert('Thông báo', 'Vui lòng điền nội dung bình luận', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!users || !users.length) {
      Alert.alert('Thông báo', 'Vui lòng chọn Người nhận', [
        {
          text: 'Đóng',
          style: 'destructive',
        },
      ]);

      return;
    }
    const payload = {
      content,
      objectId: document.id,
      objectType: modeStatus === 2 ? 0 : 1,
      attachmentIds: state.files.map(file => file.id),
      toUsers: users.map(user => ({
        userId: user.userId,
        deptId: user.deptId,
        roleId: user.roleId,
        positionId: user.positionId,
        userDeptRoleId: user.userDeptRoleId,
      })),
    };
    await addComment(payload);
    setContent('');
    setUsers(null);
    actions.reset();
    inputEl.current.wrappedInstance.blur();
    setWriting(false);
    setSubmitting(true);
    setSubmitting(false);
  };
  const onTabFocus = payload => {
    actions.reset();
    if (payload.state.params?.focusComment) {
      inputEl.current.wrappedInstance.focus();
    }
  };
  if (isAutoBccDuThao) {
    return <></>;
  }
  return (
    <View style={styles.footer}>
      {state.files.length > 0 && (
        <View style={{ paddingTop: 11 }}>
          <FlatList
            data={state.files}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AttachmentItem
                canDownload={false}
                onRemove={() => actions.remove(item.id)}
                name={item.fileName}
                path={item.filePath}
                extension={item.fileExtention}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          />
        </View>
      )}
      {state.loading && (
        <View style={styles.loading}>
          <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
          <Text style={styles.loadingText}>Đang tải file lên</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', paddingVertical: 11 }}>
        <NavigationEvents
          onDidFocus={onTabFocus}
          onWillBlur={Keyboard.dismiss}
          onDidBlur={actions.reset}
        />
        <IconButton
          disabled={state.loading}
          icon="link"
          iconStyle={{ color: state.loading ? colors.lightBlue : colors.blue }}
          style={styles.btn}
          onPress={() => actions.upload(false)}
        />
        {Platform.OS === 'ios' && (
          <IconButton
            disabled={state.loading}
            icon="image"
            iconStyle={{ color: state.loading ? colors.lightBlue : colors.blue }}
            style={styles.btn}
            onPress={() => actions.upload(true)}
          />
        )}
        <Item regular style={[styles.item, writing ? { height: 106, paddingTop: 32 } : null]}>
          <Textarea
            ref={inputEl}
            numberOfLines={writing ? 4 : 1}
            placeholder="Viết bình luận"
            style={[styles.textarea, writing ? { height: 74, paddingTop: 0 } : {}]}
            onFocus={() => setWriting(true)}
            onBlur={() => setWriting(false)}
            value={content}
            onChangeText={setContent}
          />
        </Item>
        <IconButton
          disabled={state.loading}
          icon="send"
          iconStyle={{ color: '#fff' }}
          style={styles.sendBtn}
          onPress={send}
        />
        {writing && <UserSelectBtn onPress={() => setModalVisible(true)} users={users} />}
      </View>
      {!submitting && (
        <UserSelectModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelected={setUsers}
          mode={modeStatus}
          documentId={document?.id}
        />
      )}
    </View>
  );
};

Footer.propTypes = {
  addComment: PropTypes.func.isRequired,
  document: PropTypes.shape({
    id: PropTypes.string,
  }),
  mode: PropTypes.number.isRequired,
};

Footer.defaultProps = {
  document: {
    id: '',
  },
};

export default Footer;
