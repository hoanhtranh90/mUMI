import React from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { ACTION_CODE, HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import _ from 'lodash';
import Header from './DetailScreenHeader';
import useDetailForm from './useDetailForm';
import DetailFooter from './DetailFooter';
import MeetingForm from '../common/MeetingForm.container';

const DetailScreen = ({ executeMeeting, actionList, navigation }) => {
  const [state, actions] = useDetailForm();

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = data => {
    let msg = '';
    if (data.actionCode === ACTION_CODE.PHE_DUYET) {
      if (!state.room) {
        msg = 'Chưa chọn phòng họp.';
        showAlert(msg);
        return;
      }
      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
        return;
      }
    }

    if (data.actionCode === ACTION_CODE.TU_CHOI) {
      if (!state.room) {
        msg = 'Chưa chọn phòng họp.';
        showAlert(msg);
        return;
      }
      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
        return;
      }
    }

    if (data.actionCode === ACTION_CODE.CAP_NHAT) {
      if (!state.newRoom) {
        msg = 'Chưa chọn phòng họp mới.';
        showAlert(msg);
        return;
      }
      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
        return;
      }
    }

    if (data.actionCode === ACTION_CODE.HUY_YEU_CAU) {
      if (!state.room) {
        msg = 'Chưa chọn phòng họp.';
        showAlert(msg);
        return;
      }
      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
        return;
      }
    }

    if (_.isEmpty(msg)) {
      const meeting = {};
      meeting.caseMasterId = navigation.getParam('caseMasterId', '');
      if (!_.isNull(state.newRoom)) {
        meeting.roomId = state.newRoom.id;
      } else if (!_.isNull(state.room)) {
        meeting.roomId = state.room.id;
      }
      meeting.note = state.note;
      executeMeeting({ meeting, actionName: data.actionName, actionCode: data.actionCode });
    }
  };
  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <MeetingForm state={state} setValue={actions.setValue} type={HANHCHINH_TYPE.DETAIL} />
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
    </Container>
  );
};
DetailScreen.propTypes = {
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  executeMeeting: PropTypes.func,
};
DetailScreen.defaultProps = {
  actionList: [],
  executeMeeting() {},
};

export default DetailScreen;
