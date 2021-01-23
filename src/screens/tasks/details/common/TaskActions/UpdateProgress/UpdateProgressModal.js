import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Text, Textarea } from 'native-base';

import BottomModal from 'eoffice/components/modals/BottomModal';
import ModalTitle from 'eoffice/components/modals/ModalTitle';
import IconField from 'eoffice/components/IconField';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import colors from 'eoffice/utils/colors';
import useFileUpload from 'eoffice/utils/useFileUpload';
import FileField from './FileField';
import ProgressField from './ProgressField';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressItem: {
    minHeight: 90,
  },
});

const UpdateProgressModal = ({ isVisible, onClose, progress, updateProgress }) => {
  const [note, setNote] = useState('');
  const [newProgress, setNewProgress] = useState(progress);
  const [state, actions] = useFileUpload({ objectType: ATTACHMENT_TYPES.TASK });

  const closeModal = () => {
    setNote(null);
    actions.reset()
    onClose();
  };
  const submit = () => {
    updateProgress({
      completionPercent: newProgress,
      reportContent: note,
      attachmentIds: state.files.length > 0 ? state.files.map(file => file.id) : undefined,
    });
    closeModal();
  };
  const noteValid = !note;
  return (
    <BottomModal isVisible={isVisible} onClose={closeModal}>
      <ModalTitle title="Cập nhật tiến độ" />
      <IconField
        wrapperStyle={{ paddingTop: 0 }}
        label="Tiến độ"
        iconName="trending-up"
        highlight={newProgress !== progress}
        itemStyle={styles.progressItem}
      >
        <ProgressField current={progress} value={newProgress} onChange={setNewProgress} />
      </IconField>
      <IconField required label="Ghi chú" iconName="edit" highlight={!!note}>
        <Textarea
          numberOfLines={3}
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={note}
          onChangeText={setNote}
        />
      </IconField>
      <IconField iconName="file" label="File đính kèm" highlight={state.files.length > 0}>
        <FileField state={state} actions={actions} />
      </IconField>
      <Button block style={styles.btn} disabled={noteValid} onPress={submit}>
        <Text style={styles.btnText} uppercase={false}>
          Cập nhật
        </Text>
      </Button>
    </BottomModal>
  );
};

UpdateProgressModal.propTypes = {
  updateProgress: PropTypes.func.isRequired,

  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  progress: PropTypes.number,
};
UpdateProgressModal.defaultProps = {
  isVisible: false,
  onClose() {},
  progress: 0,
};

export default UpdateProgressModal;
