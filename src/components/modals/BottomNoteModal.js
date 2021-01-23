import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Spinner, Text, Textarea } from 'native-base';

import BottomModal from './BottomModal';
import ModalTitle from './ModalTitle';
import IconField from '../IconField';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 40,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingBtn: {
    backgroundColor: colors.blue,
  },
});

const BottomNoteModal = ({
  label,
  loading,
  noteRequired,
  onClose,
  onSubmit,
  title,
  visible,
  defaultComment,
}) => {
  const [note, setNote] = useState(null);
  const requireNote = noteRequired ? !note : null;

  useEffect(
    () => {
      setNote(defaultComment);
    },
    [defaultComment]
  );

  return (
    <BottomModal isVisible={visible} onClose={loading ? null : onClose}>
      <ModalTitle title={title} />
      <IconField required={noteRequired} label={label} iconName="edit" highlight={!!note}>
        <Textarea
          numberOfLines={4}
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={note}
          onChangeText={setNote}
          disabled={loading}
        />
      </IconField>
      <Button
        disabled={(requireNote && !note) || loading}
        block
        style={[styles.btn, loading ? styles.loadingBtn : null]}
        onPress={() => onSubmit(note)}
      >
        <Text style={styles.btnText} uppercase={false}>
          Đồng ý
        </Text>
        {loading && <Spinner size="small" color="#fff" />}
      </Button>
    </BottomModal>
  );
};

BottomNoteModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,

  label: PropTypes.string,
  loading: PropTypes.bool,
  noteRequired: PropTypes.bool,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};
BottomNoteModal.defaultProps = {
  label: 'Ghi chú',
  loading: false,
  noteRequired: false,
  onClose() {},
  visible: false,
};

export default BottomNoteModal;
