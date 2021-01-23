import React from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { ACTION_CODE, HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import _ from 'lodash';
import Header from './DetailScreenHeader';
import useDetailForm from './useDetailForm';
import DetailFooter from './DetailFooter';
import CarForm from '../common/CarForm.container';

const DetailScreen = ({ executeDatXe, actionList, navigation }) => {
  const [state, actions] = useDetailForm();

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = data => {
    let msg = '';

    if (data.actionCode === ACTION_CODE.CAP_NHAT) {
      if (_.isEmpty(state.carAndDriverSelected)) {
        msg = 'Chưa chọn xe và lái xe.';
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
      if (!state.note) {
        msg = 'Chưa nhập ghi chú.';
        showAlert(msg);
        return;
      }
    }

    if (_.isEmpty(msg)) {
      const carRequest = {};
      carRequest.caseMasterId = navigation.getParam('caseMasterId', '');
      carRequest.note = state.note;
      carRequest.carAndDriverSelected = state.carAndDriverSelected;
      executeDatXe({ carRequest, actionName: data.actionName, actionCode: data.actionCode });
    }
  };
  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <CarForm state={state} setValue={actions.setValue} type={HANHCHINH_TYPE.DETAIL} />
      </Content>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        {actionList.map((data, index) => (
          <DetailFooter
            actionName={data.actionName}
            actionCode={data.actionCode}
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
  executeDatXe: PropTypes.func,
};
DetailScreen.defaultProps = {
  actionList: [],
  executeDatXe() {},
};

export default DetailScreen;
