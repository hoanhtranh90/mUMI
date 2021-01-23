import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'native-base';

import Fsb from 'eoffice/components/Fsb';
import colors from 'eoffice/utils/colors';
import ApproveCompletedTask from './ApproveCompletedTask';
import CancelTask from './CancelTask.container';
import CompleteTask from './CompleteTask.container';
import ExtendTask from './ExtendTask';
import PauseTask from './PauseTask.container';
import RefuseCompletedTask from './RefuseCompletedTask.container';
import RefuseTask from './RefuseTask.container';
import UpdateProcess from './UpdateProgress';

const TaskActions = ({
  approveTask,
  canCancel,
  canComplete,
  canExtend,
  canPause,
  canProcessApply,
  canProcessComplete,
  canUpdateProgress,
}) => (
  <View
    style={{
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}
  >
    {canUpdateProgress && <UpdateProcess />}
    {canProcessApply && (
      <Fsb
        text="Phê duyệt đăng ký"
        borderColor={colors.lightGreen}
        icon={
          <Icon name="arrow-alt-circle-right" type="FontAwesome5" style={{ color: colors.green }} />
        }
        onPress={approveTask}
      />
    )}
    {canProcessApply && (
      <RefuseTask
        noteRequired
        label="Nhập lý do từ chối"
        actionName="Từ chối đăng ký"
        borderColor={colors.lightRed}
        icon={<Icon name="calendar-times" type="FontAwesome5" style={{ color: colors.red }} />}
      />
    )}
    {canCancel && (
      <CancelTask
        noteRequired
        label="Nhập lý do hủy"
        actionName="Hủy"
        borderColor={colors.lightRed}
        icon={<Icon name="ban" type="FontAwesome5" style={{ color: colors.red }} />}
      />
    )}
    {canComplete && (
      <CompleteTask
        noteRequired
        actionName="Hoàn thành"
        borderColor={colors.lightGreen}
        icon={<Icon name="check-circle" type="FontAwesome5" style={{ color: colors.green }} />}
      />
    )}
    {canProcessComplete && <ApproveCompletedTask />}
    {canProcessComplete && (
      <RefuseCompletedTask
        noteRequired
        label="Nhập lý do từ chối"
        actionName="Từ chối hoàn thành"
        borderColor={colors.lightRed}
        icon={<Icon name="times-circle" type="FontAwesome5" style={{ color: colors.red }} />}
      />
    )}
    {canExtend && <ExtendTask />}
    {canPause && (
      <PauseTask
        noteRequired
        actionName="Tạm dừng"
        borderColor={colors.lightYellow}
        icon={<Icon name="pause-circle" type="FontAwesome5" style={{ color: colors.yellow }} />}
      />
    )}
  </View>
);

TaskActions.propTypes = {
  approveTask: PropTypes.func.isRequired,
  canCancel: PropTypes.bool,
  canComplete: PropTypes.bool,
  canExtend: PropTypes.bool,
  canPause: PropTypes.bool,
  canProcessApply: PropTypes.bool,
  canProcessComplete: PropTypes.bool,
  canUpdateProgress: PropTypes.bool,
};
TaskActions.defaultProps = {
  canCancel: false,
  canComplete: false,
  canExtend: false,
  canPause: false,
  canProcessApply: false,
  canProcessComplete: false,
  canUpdateProgress: false,
};

export default TaskActions;
