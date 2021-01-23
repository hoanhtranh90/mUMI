import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Spinner } from 'native-base';
import Orientation from 'react-native-orientation-locker';

import colors from 'eoffice/utils/colors';

const AppLoading = ({ isVisible }) => (
  <Modal
    isVisible={isVisible}
    style={{ margin: 0 }}
    backdropOpacity={0}
    animationIn="fadeIn"
    animationOut="fadeOut"
  >
    <Spinner color={colors.blue} />
  </Modal>
);

AppLoading.propTypes = {
  isVisible: PropTypes.bool,
};
AppLoading.defaultProps = {
  isVisible: false,
};

export default AppLoading;
