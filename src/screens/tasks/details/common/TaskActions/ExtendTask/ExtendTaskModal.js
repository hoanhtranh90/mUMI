import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Text, Textarea } from 'native-base';

import BottomModal from 'eoffice/components/modals/BottomModal';
import ModalTitle from 'eoffice/components/modals/ModalTitle';
import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import DeadlineField from './DeadlineField';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    marginHorizontal: 100,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ExtendTaskModal = ({ onClose, onSubmit, task, visible }) => {
  const [deadline, setDeadline] = useState();
  const [note, setNote] = useState('');

  return (
    <BottomModal isVisible={visible} onClose={onClose}>
      <ModalTitle title="Gia hạn công việc" />
      <IconField label="Hạn xử lý" iconName="clock" highlight={!!deadline}>
        <DeadlineField current={task?.deadline} onChange={setDeadline} value={deadline} />
      </IconField>
      <IconField label="Ghi chú" iconName="edit" highlight={!!note}>
        <Textarea
          numberOfLines={4}
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={note}
          onChangeText={setNote}
        />
      </IconField>
      <Button block style={styles.btn} onPress={() => onSubmit({ deadline, note })}>
        <Text style={styles.btnText} uppercase={false}>
          Đồng ý
        </Text>
      </Button>
    </BottomModal>
  );
};

ExtendTaskModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  onClose: PropTypes.func,
  task: PropTypes.shape({}),
  visible: PropTypes.bool,
};
ExtendTaskModal.defaultProps = {
  onClose() {},
  task: null,
  visible: false,
};

export default ExtendTaskModal;
