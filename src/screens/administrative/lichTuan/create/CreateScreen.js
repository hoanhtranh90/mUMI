import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Footer } from 'native-base';
import _ from 'lodash';
import { HANHCHINH_TYPE, HC_CASE_CALENDAR } from 'eoffice/constants/administrative';
import Header from './CreateScreenHeader';
import CreateFooter from './CreateFooter';
import useCreateForm from './useCreateForm';
import ScheduleForm from '../common/ScheduleForm.container';

const CreateScreen = ({ createSchedule, navigation }) => {
  const [state, actions] = useCreateForm();
  const formInvalid = !(
    state.title.trim() &&
    state.content.trim() &&
    state.startDate &&
    state.endDate &&
    (state.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
      (state.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.OFFLINE && state.place)) &&
    state.listLanhDao?.length > 0
  );
  // state.listCT.length == 1

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = () => {
    let msg = '';
    if (!formInvalid) {
      if (state.startDate && state.endDate) {
        state.startDate.setSeconds(0);
        state.endDate.setSeconds(0);
        if (state.startDate >= state.endDate) {
          msg = 'Thời gian kết thúc không được nhỏ hơn hoặc bằng thời gian bắt đầu.';
          showAlert(msg);
          return;
        }
      }
      if (state.listCT.length > 1) {
        msg = 'Chỉ được chọn 1 đơn vị chủ trì.';
        showAlert(msg);
        return;
      }

      if (_.isEmpty(msg)) {
        createSchedule(state);
      }
    } else {
      // form invalid action

      if (!state.title.trim()) {
        msg = 'Chưa nhập tiêu đề cuộc họp.';
        showAlert(msg);
        return;
      }

      if (!state.content.trim()) {
        msg = 'Chưa nhập nội dung làm việc.';
        showAlert(msg);
        return;
      }

      if (!state.startDate) {
        msg = 'Chưa nhập thời gian bắt đầu.';
        showAlert(msg);
        return;
      }

      if (!state.endDate) {
        msg = 'Chưa nhập thời gian kết thúc.';
        showAlert(msg);
        return;
      }

      if (state.startDate && state.endDate) {
        state.startDate.setSeconds(0);
        state.endDate.setSeconds(0);
        if (state.startDate >= state.endDate) {
          msg = 'Thời gian kết thúc không được nhỏ hơn hoặc bằng thời gian bắt đầu.';
          showAlert(msg);
          return;
        }
      }

      if (!state.place) {
        msg = 'Chưa nhập địa điểm diễn ra cuộc họp.';
        showAlert(msg);
        return;
      }

      if (!state.listLanhDao || !state.listLanhDao.length > 0) {
        msg = 'Chưa chọn danh sách lãnh đạo.';
        showAlert(msg);
        return;
      }

      // if (!state.listCT || !state.listCT.length > 0) {
      //   msg = 'Chưa chọn danh sách đơn vị chủ trì.';
      //   showAlert(msg);
      //   return;
      // }

      // if (!state.listPH || !state.listPH.length > 0) {
      //   msg = 'Chưa chọn danh sách đơn vị phối hợp.';
      //   showAlert(msg);
      //   return;
      // }
      // if (state.listCT.length > 1) {
      //   msg = 'Chỉ được chọn 1 đơn vị chủ trì.';
      //   showAlert(msg);
      //   return;
      // }
    }
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <ScheduleForm
          state={state}
          setValue={actions.setValue}
          type={HANHCHINH_TYPE.CREATE}
          navigation={navigation}
          onLoaded={() => {}}
        />
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <CreateFooter onPress={submit} />
      </Footer>
    </Container>
  );
};

CreateScreen.propTypes = {
  createSchedule: PropTypes.func.isRequired,
};
CreateScreen.defaultProps = {};

export default CreateScreen;
