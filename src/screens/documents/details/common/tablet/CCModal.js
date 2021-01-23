import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Container } from 'native-base';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import CCScreen from '../../../cc/CCScreen';

const styles = StyleSheet.create({
  field: {
    backgroundColor: 'white',
    flex: 1,
    marginLeft: variables.deviceWidth / 6.1,
    marginRight: variables.deviceWidth / 6.1,
    marginTop: variables.deviceHeight / 9,
    marginBottom: variables.deviceHeight / 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});

const CCModal = ({ close, isVisible, document }) => (
  <Modal
    isVisible={isVisible}
    onBackButtonPress={close}
    onBackdropPress={close}
    animationIn="fadeInUp"
    animationOut="fadeOutDown"
  >
    <Container style={styles.field}>
      <CCScreen document={document} />
    </Container>
  </Modal>
);

CCModal.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  document: PropTypes.shape({
    docCode: PropTypes.string,
    docDate: PropTypes.number,
    quote: PropTypes.string,
  }).isRequired,
};

CCModal.defaultProps = {
  close() { },
  isVisible: false,
};

export default CCModal;
