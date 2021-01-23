import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Footer } from 'native-base';
import _ from 'lodash';
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import { HANHCHINH_TYPE } from 'eoffice/constants/administrative';
import Header from './CreateScreenHeader';
import VeMayBayForm from '../common/VeMayBayForm.container';
import CreateFooter from './CreateFooter';
import useCreateForm from './useCreateForm';
import { DocumentPickerUtil } from 'react-native-document-picker';

const CreateScreen = ({ createVeMayBay, navigation }) => {
  const [stateFiles, actionsFiles] = useFileUploadFile(
    {
      objectType: ATTACHMENT_TYPES.TOTRINH_VEMAYBAY,
    },
    DocumentPickerUtil.pdf()
  );

  const [state, actions] = useCreateForm();

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }
  // eslint-disable-next-line no-unused-vars
  const getFile = stateFile => {};
  const submit = async () => {
    let msg = '';
    if (!state.requestName.trim()) {
      msg = 'Chưa nhập tiêu đề yêu cầu.';
      showAlert(msg);
      return;
    }
    if (!state.requestContent.trim()) {
      msg = 'Chưa nhập nội dung yêu cầu.';
      showAlert(msg);
      return;
    }
    if (stateFiles?.files?.length === 0) {
      msg = 'Chưa có file tờ trình công tác.';
      showAlert(msg);
      return;
    }
    if (state.flightUserList.length === 0) {
      msg = 'Chưa nhập danh sách người tham gia.';
      showAlert(msg);
      return;
    }
    if (state.flightRouteList.length === 0) {
      msg = 'Chưa nhập danh sách chặng bay.';
      showAlert(msg);
      return;
    }

    if (_.isEmpty(msg)) {
      const stateTmp = state;
      const flightUserListTmp = state?.flightUserList?.map(item => {
        const flightRouteTmp = {
          userName: item?.userName,
          positionId: item?.positionId?.id,
          isdn: item?.isdn,
          identityNumber: item?.identityNumber,
          gender: item?.gender?.key,
          email: item?.email,
          deptId: item?.deptId?.id,
          bsvNumber: item?.bsvNumber,
          birthday: item?.birthday,
        };
        return flightRouteTmp;
      });
      const flightRouteListTmp = state?.flightRouteList?.map(item => {
        const flightRouteTmp = {
          airportFromId: item?.airportFromId?.id,
          airportToId: item?.airportToId?.id,
          flightTimeEstimate: item?.flightTimeEstimate,
        };
        return flightRouteTmp;
      });
      const flightFileList = stateFiles.files.map(flightFile => {
        const flightFileListTmp = {
          id: flightFile.id,
          fileName: flightFile.fileName,
          fileExtention: flightFile.fileExtention,
        };
        return flightFileListTmp;
        // }
      });
      stateTmp.flightRouteList = flightRouteListTmp;
      stateTmp.flightFileList = flightFileList;
      stateTmp.flightUserList = flightUserListTmp;

      await actions.setValue('flightFileList', stateFiles);
      createVeMayBay(stateTmp);
    }
  };

  return (
    <Container>
      <Header navigation={navigation} />
      <Content>
        <VeMayBayForm
          stateA={state}
          setValue={actions.setValue}
          type={HANHCHINH_TYPE.CREATE}
          getFile={getFile}
          stateFilesA={stateFiles}
          actionsFilesA={actionsFiles}
        />
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <CreateFooter onPress={submit} />
      </Footer>
    </Container>
  );
};

CreateScreen.propTypes = {
  createVeMayBay: PropTypes.func.isRequired,
};
CreateScreen.defaultProps = {};

export default CreateScreen;
