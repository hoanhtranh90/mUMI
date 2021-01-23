import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import variables from 'eoffice/native-base-theme/variables/commonColor';

const defaultStyles = StyleSheet.create({
  modal: {
    justifyContent: DeviceInfo.isTablet() ? 'center' : 'flex-end',
    alignSelf: 'center',
    width: DeviceInfo.isTablet() ? variables.deviceWidth / 2 : variables.deviceWidth,
  },
  wrapper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: DeviceInfo.isTablet() ? 12 : 0,
    borderBottomRightRadius: DeviceInfo.isTablet() ? 12 : 0,
    backgroundColor: '#fff',
    paddingBottom: variables.isIphoneX ? 58 : 24,
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});

const BottomModal = ({ children, isVisible, onClose, wrapperStyle }) => (
  <Modal
    avoidKeyboard
    isVisible={isVisible}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    style={defaultStyles.modal}
  >
    {Platform.OS === 'android' ? <StatusBar backgroundColor="rgba(0,0,0,0.5)" /> : null}

    <View style={[defaultStyles.wrapper, wrapperStyle]}>{children}</View>
  </Modal>
);

BottomModal.propTypes = {
  children: PropTypes.node.isRequired,

  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  wrapperStyle: PropTypes.shape({}),
};
BottomModal.defaultProps = {
  isVisible: false,
  onClose() {},
  wrapperStyle: null,
};

export default BottomModal;
