import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Footer } from 'native-base';
import _ from 'lodash';
import { HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import Header from './CreateScreenHeader';
import MeetingForm from '../common/MeetingForm.container';
import CreateFooter from './CreateFooter';
import useCreateForm from './useCreateForm';

const CreateScreen = ({ createMeeting, navigation }) => {
  const [state, actions] = useCreateForm();
  const formInvalid = !(
    state.title.trim() &&
    state.content.trim() &&
    state.startDate &&
    state.endDate &&
    state.important &&
    state.room &&
    state.note.trim()
  );

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
      if (_.isEmpty(msg)) {
        createMeeting(state);
      }
    } else {
      // form invalid action
      if (!state.title.trim()) {
        msg = 'Chưa nhập tiêu đề cuộc họp.';
        showAlert(msg);
        return;
      }

      if (!state.content.trim()) {
        msg = 'Chưa nhập nội dung.';
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

      if (!state.important) {
        msg = 'Chưa nhập mức độ quan trọng.';
        showAlert(msg);
        return;
      }

      // if (!state.room) {
      //   msg = 'Chưa chọn phòng họp.';
      //   showAlert(msg);
      //   return;
      // }
      if (!state.note.trim()) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
      }
    }
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <MeetingForm state={state} setValue={actions.setValue} type={HANHCHINH_TYPE.CREATE} />
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <CreateFooter onPress={submit} />
      </Footer>
    </Container>
  );
};

CreateScreen.propTypes = {
  createMeeting: PropTypes.func.isRequired,
};
CreateScreen.defaultProps = {};

export default CreateScreen;
