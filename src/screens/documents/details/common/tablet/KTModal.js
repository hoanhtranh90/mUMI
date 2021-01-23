import React from 'react';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import FinishesContainer from '../../../finish/Finishes.container';

const KTModal = ({ close, isVisible, mode, docUserView }) => (
  <Modal
    isVisible={isVisible}
    onBackButtonPress={close}
    onBackdropPress={close}
    style={{ alignItems: 'center' }}
    animationIn="fadeInUp"
    animationOut="fadeOutDown"
  >
    {mode === DOCUMENT_TYPE.VB_DEN && (
      <Container style={{ width: '50%' }}>
        <FinishesContainer docUserView={docUserView} onClose={close} />
      </Container>
    )}
  </Modal>
);

KTModal.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  mode: PropTypes.number,
  docUserView: PropTypes.shape({}),
};
KTModal.defaultProps = {
  close() {},
  isVisible: false,
  mode: DOCUMENT_TYPE.VB_DEN,
  docUserView: {},
};

export default KTModal;
