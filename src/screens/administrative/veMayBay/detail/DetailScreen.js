import React, { useState } from 'react';
import {Alert, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Content, Icon, Text} from 'native-base';
import Modal from 'react-native-modal';
import { ACTION_CODE, HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import useFileUploadTickets from 'eoffice/utils/useFileUploadTickets';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import _ from 'lodash';
import Header from './DetailScreenHeader';
import useDetailForm from './useDetailForm';
import DetailFooter from './DetailFooter';
import VeMayBayForm from '../common/VeMayBayForm.container';
import RoundButton from "../../common/RoundButton";
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import {DocumentPickerUtil} from "react-native-document-picker";
import {STATUS_CODE} from "../../../../constants/administrative";

const styles = StyleSheet.create({
    containerModal: {
      backgroundColor: 'white',
      height: 200,
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      borderRadius: 8,
    },
    wrapper: {
      height: 30,
      width: 100,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',

      borderWidth: 1,
      borderColor: 'rgba(0, 122, 255, 0.1)',
      borderBottomWidth: 0,
      shadowColor: 'rgba(0, 122, 255, 0.2)',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: 'white',
    },
    textInput: {
      width: '80%',
      borderRadius: 5,
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      height: 40,
      marginTop: 20,
      fontSize: 14,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 2,
    }
});

const DetailScreen = ({ executeVeMayBay, actionList, navigation }) => {
  const [state, actions] = useDetailForm();
  const [isOpenPopup , setIsOpenPopup] = useState({val: 0, index: -1})
  // eslint-disable-next-line no-unused-vars
  const [stateTickets, actionsTickets] = useFileUploadTickets({
    objectType: ATTACHMENT_TYPES.VEMAYBAY,
  });

  const [stateFiles, actionsFiles] = useFileUploadFile({
    objectType: ATTACHMENT_TYPES.TOTRINH_VEMAYBAY,
  }, DocumentPickerUtil.pdf());

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const display = navigation.getParam('display', {
    status: null,
    state: null
  })

  const submit = data => {
    let msg = '';
    if (!state.note) {
      msg = 'Chưa nhập ghi chú'
      showAlert(msg)
      return;
    }

    if (data.actionCode === ACTION_CODE.PHE_DUYET) {
      if (stateTickets?.files?.length === 0) {
        msg = 'Chưa có vé máy bay.';
        showAlert(msg);
        return;
      }
      state.hcCaseFlightRouteUser.forEach((item, index) => {
        if (!item.ticketNumber) {
          msg = `Chưa cập nhật số vé cho ${item.userName}`;
          setIsOpenPopup(object =>  {
            return {
              val: object.val + 1,
              index: index
            }
          })
          return
        }
        if (!item.flightTimeRealistic) {
          msg = `Chưa cập nhật thời gian bay thực tế cho ${item.userName}.`;
          setIsOpenPopup(object =>  {
            return {
              val: object.val + 1,
              index: index
            }
          })
          return
        }
      })
    }

    if (data.actionCode === ACTION_CODE.CAP_NHAT) {
      if (stateTickets?.files?.length === 0) {
        msg = 'Chưa có vé máy bay.';
        showAlert(msg);
        return;
      }
    }


    if (_.isEmpty(msg)) {
      const veMayBayRequest = {};

      veMayBayRequest.caseMasterId = navigation.getParam('caseMasterId', '');
      veMayBayRequest.note = state.note;
      veMayBayRequest.hcCaseFlightFiles = state.hcCaseFlightFiles;
      veMayBayRequest.hcCaseFlightRoutes = state.hcCaseFlightRoutes;
      veMayBayRequest.hcCaseFlightRouteUser = state.hcCaseFlightRouteUser;
      veMayBayRequest.stateTickets = stateTickets;
      veMayBayRequest.flightRoute = state.flightRoute;
      executeVeMayBay({
        veMayBayRequest,
        actionName: data.actionName,
        actionCode: data.actionCode,
      });
    }
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <VeMayBayForm
          isOpenPopup={isOpenPopup}
          display={display}
          stateA={state}
          setValue={actions.setValue}
          type={HANHCHINH_TYPE.DETAIL}
          actionList={actionList}
          actionsFilesA={actionsFiles}
          stateFilesA={stateFiles}
          stateTickets={stateTickets}
          actionsTickets={actionsTickets}
        />
      </Content>
      <View style={{ flexDirection: 'row',justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}>
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
  executeVeMayBay: PropTypes.func,
};
DetailScreen.defaultProps = {
  actionList: [],
  executeVeMayBay() {},
};

export default DetailScreen;
