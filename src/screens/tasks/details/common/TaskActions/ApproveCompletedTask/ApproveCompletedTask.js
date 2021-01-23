import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon, Button, Spinner, Textarea } from 'native-base';

import Avatar from 'eoffice/components/Avatar';
import colors from 'eoffice/utils/colors';
import Fsb from 'eoffice/components/Fsb';
import useModal from 'eoffice/utils/useModal';
import BottomModal from 'eoffice/components/modals/BottomModal';
import ModalTitle from 'eoffice/components/modals/ModalTitle';
import IconField from 'eoffice/components/IconField';
import NavigationService from 'eoffice/utils/NavigationService';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import styles from './ApproveCompletedTask.style';
import RatingField from './RatingField';

const ApproveCompletedTask = ({ task, approveCompletedTask }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, open, close] = useModal();
  const [score, setScore] = useState(null);

  const onClose = () => {
    setNote(null);
    setScore(null);
    close();
  };

  const submit = async () => {
    setLoading(true);
    const result = await approveCompletedTask({ note, score });
    if (result) {
      close();
      NavigationService.goBack();
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Fsb
        text="Phê duyệt hoàn thành"
        icon={<Icon name="play-circle" type="FontAwesome5" style={{ color: colors.green }} />}
        onPress={open}
        borderColor={colors.lightGreen}
      />
      <BottomModal isVisible={isVisible} onClose={loading ? null : onClose}>
        <ModalTitle
          title="Đánh giá công việc"
          titleStyle={{ fontSize: 20 }}
          wrapperStyle={styles.modalTitle}
        />
        <View style={styles.viewContainerTitle}>
          <View style={styles.viewAvatar}>
            <View style={styles.line} />
            <Avatar name={task?.receiverName} size={variables.deviceHeight * 0.062} />
            <View style={styles.line} />
          </View>

          <Text style={styles.receiverName}>{task?.receiverName}</Text>
          <Text style={styles.defaultTitle}>Trong công việc</Text>
          <Text style={styles.taskTitle} numberOfLines={3}>
            {task?.taskTitle}
          </Text>
        </View>

        <RatingField wrapperStyle={styles.viewContainerRating} setScore={setScore} score={score} />

        <IconField
          required={!note}
          label="Ghi chú"
          iconName="edit"
          highlight={!!note}
          wrapperStyle={{ paddingTop: 0 }}
        >
          <Textarea
            numberOfLines={4}
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={note}
            onChangeText={setNote}
            disabled={loading}
          />
        </IconField>

        <View style={styles.viewContainerButton}>
          <Button
            disabled={!note || !score || loading}
            block
            style={[
              styles.btn,
              { width: variables.deviceWidth * 0.58 },
              loading ? styles.loadingBtn : null,
            ]}
            onPress={submit}
          >
            <Text style={[styles.btnText, { color: '#ffffff' }]} uppercase={false}>
              Đồng ý
            </Text>
            {loading && <Spinner size="small" color="#fff" />}
          </Button>

          <Button style={[styles.btn, styles.buttonComplete]} block onPress={onClose}>
            <Text style={[{ color: '#ff3b30' }, styles.btnText]} uppercase={false}>
              Hủy
            </Text>
          </Button>
        </View>
      </BottomModal>
    </>
  );
};

ApproveCompletedTask.propTypes = {
  approveCompletedTask: PropTypes.func.isRequired,
  task: PropTypes.shape({ taskTitle: PropTypes.string }),
};
ApproveCompletedTask.defaultProps = {
  task: {},
};
export default ApproveCompletedTask;
