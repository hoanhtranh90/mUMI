import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import Modal from 'react-native-modal';
// import NotificationsScreenContainer from '../../screens/dashboard/Notifications/tablet/NotificationsScreen.container';
import NotificationsScreenContainer from '../../screens/dashboard/notification/tablet';

const styles = StyleSheet.create({
  fieldNoti: {
    margin: 0,
  },
  notiContainer: {
    // right: 0,
    left: 0.53 * variables.deviceWidth,
    width: 0.47 * variables.deviceWidth,
    height: variables.deviceHeight,
    borderWidth: 1,
    borderColor: '#a6a3a0',
  },
});

const NotificationTab = ({ setVisible }) => (
  <Modal isVisible style={styles.fieldNoti} onBackdropPress={setVisible} animationIn="slideInRight">
    <View style={styles.notiContainer}>
      <NotificationsScreenContainer setVisible={setVisible} />
    </View>
  </Modal>
);
NotificationTab.propTypes = {
  setVisible: PropTypes.func.isRequired,
};

export default NotificationTab;
