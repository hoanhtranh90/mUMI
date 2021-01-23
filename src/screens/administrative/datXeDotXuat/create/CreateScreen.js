import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Footer } from 'native-base';
import _ from 'lodash';
import { HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import Header from './CreateScreenHeader';
import CarForm from '../common/CarForm.container';
import CreateFooter from './CreateFooter';
import useCreateForm from './useCreateForm';

const CreateScreen = ({ createDieuXeDX, navigation }) => {
  const [state, actions] = useCreateForm();
  const formInvalid = !(
    state.title.trim() &&
    state.content.trim() &&
    state.numberOfPeople.trim() &&
    state.fromPlace.trim() &&
    state.toPlace.trim() &&
    state.startTime &&
    state.endTime &&
    state.note &&
    !_.isEmpty(state.carAndDriverSelected)
  );

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = () => {
    let msg = '';
    if (!formInvalid) {
      if (state.startTime && state.endTime) {
        state.startTime.setSeconds(0);
        state.endTime.setSeconds(0);
        if (state.startTime >= state.endTime) {
          msg = 'Thời gian về không được nhỏ hơn hoặc bằng thời gian đi.';
          showAlert(msg);
          return;
        }

        if (state.numberOfPeople.trim()) {
          if (state.numberOfPeople.trim() === '0') {
            msg = 'Số người đi không hợp lệ.';
            showAlert(msg);
            return;
          }
        }
      }
      if (state.carAndDriverSelected.length > 1) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < state.carAndDriverSelected.length - 1; i++) {
          // eslint-disable-next-line no-plusplus
          for (let j = i + 1; j < state.carAndDriverSelected.length; j++) {
            if (
              state.carAndDriverSelected[i].driverSelected.id ===
              state.carAndDriverSelected[j].driverSelected.id
            ) {
              msg = 'Danh sách xe và tài xế trùng nhau';
              showAlert(msg);
              return;
            }
          }
        }
      }
      if (_.isEmpty(msg)) {
        createDieuXeDX(state);
      }
    } else {
      // form invalid action
      if (!state.title.trim()) {
        msg = 'Chưa nhập tiêu đề yêu cầu.';
        showAlert(msg);
        return;
      }

      if (!state.content.trim()) {
        msg = 'Chưa nhập nội dung yêu cầu.';
        showAlert(msg);
        return;
      }

      if (!state.numberOfPeople.trim()) {
        msg = 'Chưa nhập số người đi.';
        showAlert(msg);
        return;
      }

      if (!state.fromPlace.trim()) {
        msg = 'Chưa nhập địa điểm xuất phát.';
        showAlert(msg);
        return;
      }

      if (!state.toPlace.trim()) {
        msg = 'Chưa nhập địa điểm đến.';
        showAlert(msg);
        return;
      }

      if (!state.startTime) {
        msg = 'Chưa nhập thời gian đi.';
        showAlert(msg);
        return;
      }

      if (!state.endTime) {
        msg = 'Chưa nhập thời gian về.';
        showAlert(msg);
        return;
      }

      if (state.startTime && state.endTime) {
        state.startTime.setSeconds(0);
        state.endTime.setSeconds(0);
        if (state.startTime >= state.endTime) {
          msg = 'Thời gian về không được nhỏ hơn hoặc bằng thời gian đi.';
          showAlert(msg);
          return;
        }
      }

      if (_.isEmpty(state.carAndDriverSelected)) {
        msg = 'Chưa chọn xe và lái xe.';
        showAlert(msg);
        return;
      }

      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
      }
    }
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <CarForm state={state} setValue={actions.setValue} type={HANHCHINH_TYPE.CREATE} />
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <CreateFooter onPress={submit} />
      </Footer>
    </Container>
  );
};

CreateScreen.propTypes = {
  createDieuXeDX: PropTypes.func.isRequired,
};
CreateScreen.defaultProps = {};

export default CreateScreen;
