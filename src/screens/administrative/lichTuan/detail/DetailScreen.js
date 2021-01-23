import React, { useState } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Icon } from 'native-base';
import { ACTION_CODE, HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import _ from 'lodash';
import Header from './DetailScreenHeader';
import useDetailForm from './useDetailForm';
import DetailFooter from './DetailFooter';
import ScheduleForm from '../common/ScheduleForm.container';
import colors from 'eoffice/utils/colors';
import { HC_CASE_CALENDAR } from '../../../../constants/administrative';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  btnAdd: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 30,
    bottom: 70,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});
const DetailScreen = ({ executeSchedule, actionList, navigation, getAction }) => {
  const [state, actions] = useDetailForm();
  const [openModalShare, setOpenModalShare] = useState(0);

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = data => {
    let msg = '';
    if (data.actionCode === ACTION_CODE.PHE_DUYET) {
      // if (!state.newroom && !state.room) {
      //   msg = 'Chưa chọn phòng họp mới.';
      //   showAlert(msg);
      //   return;
      // }
      if (!state.note) {
        msg = 'Vui lòng nhập lý do hủy yêu cầu.';
        showAlert(msg);
        return;
      }
    }

    if (data.actionCode === ACTION_CODE.TU_CHOI) {
      if (!state.note) {
        msg = 'Vui lòng nhập lý do hủy yêu cầu.';
        showAlert(msg);
        return;
      }
    }

    if (data.actionCode === ACTION_CODE.CAP_NHAT) {
      if (state.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.OFFLINE && !state.place) {
        msg = 'Chưa nhập địa điểm.';
        showAlert(msg);
        return;
      }
      // if (!state.note) {
      //   msg = 'Vui lòng nhập lý do hủy yêu cầu.';
      //   showAlert(msg);
      //   return;
      // }
    }

    if (
      data.actionCode === ACTION_CODE.TU_HUY_YEU_CAU ||
      data.actionCode === ACTION_CODE.HUY_YEU_CAU
    ) {
      if (!state.note) {
        msg = 'Vui lòng nhập lý do hủy yêu cầu.';
        showAlert(msg);
        return;
      }
    }

    if (_.isEmpty(msg)) {
      const schedule = {};
      schedule.caseMasterId = navigation.getParam('caseMasterId', '');
      if (!_.isNull(state.newRoom)) {
        schedule.roomId = state.newRoom?.id;
      } else if (!_.isNull(state.roomName)) {
        schedule.roomId = state.roomName;
      }
      schedule.meetingTitle = state.title;
      schedule.meetingContent = state.content;
      schedule.meetingPlace = state.place;
      schedule.startTime = state.startDate;
      schedule.endTime = state.endDate;
      schedule.meetingType = state.meetingType;
      schedule.listUserIds = state.leaders.map(leader => leader.userId);
      schedule.leaders = state.leaders;
      schedule.otherInvolved = state.participant;
      schedule.chairedUnit = state.chaired;
      schedule.chairedUnitId = state.listCT[0];
      schedule.cooperateDeptIds = state.listPH;
      schedule.videoConferenceUnit = state.videoc;
      schedule.isNeedRoom = state.rqMores;
      schedule.note = state.note;
      // executeSchedule({ schedule, actionName: data.actionName, actionCode: data.actionCode });

      Alert.alert('Bạn có muốn thực hiện ' + data.actionName.toLowerCase() + ' lịch tuần', '', [
        {
          text: 'Đồng ý',
          onPress: () =>
            executeSchedule({ schedule, actionName: data.actionName, actionCode: data.actionCode }),
          style: 'default',
        },
        { text: 'Huỷ', onPress: () => {}, style: 'cancel' },
      ]);
    }
  };

  const [isShowShareBtn, setIsShowShareBtn] = useState(false);
  const [flagShowPopupShare, setFlagShowPopupShare] = useState(0);

  const onLoaded = ({ isShowBtnShare }) => {
    setIsShowShareBtn(isShowBtnShare);
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <ScheduleForm
          state={state}
          setValue={actions.setValue}
          type={HANHCHINH_TYPE.DETAIL}
          flagShowPopupShare={flagShowPopupShare}
          onLoaded={onLoaded}
        />
      </Content>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        {actionList.map((data, index) => (
          <DetailFooter
            actionCode={data.actionCode}
            actionName={data.actionName}
            key={index.toString()}
            onPress={() => submit(data)}
          />
        ))}
      </View>
      {isShowShareBtn && (
        <TouchableOpacity style={styles.btnAdd} onPress={() => setFlagShowPopupShare(val => ++val)}>
          <Icon name="share-2" type="Feather" style={{ color: 'white' }} />
        </TouchableOpacity>
      )}
    </Container>
  );
};
DetailScreen.propTypes = {
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  executeSchedule: PropTypes.func,
};
DetailScreen.defaultProps = {
  actionList: [],
  executeSchedule() {},
};

export default DetailScreen;
