import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import ForwardIncomingDoc from '../../../forward/ForwardIncomingDoc';
import ForwardOutgoingDocContainer from '../../../forward/ForwardOutgoingDoc.container';
import ForwardDepartmentsContainer from '../../../forward/ForwardDepartments/ForwardDepartments.container';
import ForwardsContainer from '../../../forwards/Forwards.container';

const styles = StyleSheet.create({
  field: { backgroundColor: 'white', flex: 1, flexDirection: 'row' },
});

const CXLModal = ({ close, isVisible, mode, isDept, isCxlNhieu, docUserView }) => (
  <Modal
    isVisible={isVisible}
    onBackButtonPress={close}
    onBackdropPress={close}
    animationIn="fadeInUp"
    animationOut="fadeOutDown"
  >
    {mode === DOCUMENT_TYPE.VB_DEN && !isDept && !isCxlNhieu && (
      <Container style={[styles.field]}>
        {mode === DOCUMENT_TYPE.VB_DEN && !isDept && <ForwardIncomingDoc onClose={close} />}
      </Container>
    )}
    {isDept && !isCxlNhieu && (
      <Container style={[styles.field]}>
        <ForwardDepartmentsContainer onClose={close} />
      </Container>
    )}
    {mode === DOCUMENT_TYPE.VB_DI && !isCxlNhieu && (
      <Container
        style={[
          styles.field,
          {
            marginLeft: variables.deviceWidth / 6.1,
            marginRight: variables.deviceWidth / 6.1,
            marginTop: variables.deviceHeight / 4,
            marginBottom: variables.deviceHeight / 4.6,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          },
        ]}
      >
        <ForwardOutgoingDocContainer onClose={close} />
      </Container>
    )}
    {isCxlNhieu && (
      <Container style={[styles.field]}>
        <ForwardsContainer onClose={close} docUserView={docUserView} />
      </Container>
    )}
  </Modal>
);

CXLModal.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  mode: PropTypes.number,
  isDept: PropTypes.bool,
  isCxlNhieu: PropTypes.bool,
  docUserView: PropTypes.shape({}),
};
CXLModal.defaultProps = {
  close() { },
  isVisible: false,
  mode: DOCUMENT_TYPE.VB_DEN,
  isDept: false,
  isCxlNhieu: false,
  docUserView: {},
};

export default CXLModal;
