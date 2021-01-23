/* eslint-disable dot-notation */
/* eslint-disable no-extra-boolean-cast */
import PropTypes from 'prop-types';
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Button, Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/app';
import colors from 'eoffice/utils/colors';
import DeviceInfo from 'react-native-device-info';
import NavigationService from 'eoffice/utils/NavigationService';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import BottomModal from 'eoffice/components/modals/BottomModal';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import Document from '../common/Documents/Document';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    marginHorizontal: 100,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewDocument: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewColumn: { justifyContent: 'center', flexDirection: 'column' },
  viewIcon: {
    borderRadius: 20,
  },
  icon: { padding: 5, color: 'white', fontSize: 18 },
  viewError: {
    alignItems: 'center',
    backgroundColor: 'rgba(229, 77, 66, 0.2)',
    width: variables.deviceWidth * 0.54,
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
  },
});
const forwarded = (doc, state) =>
  !!state.docForwarded.includes(doc) ? (
    <View style={[styles.viewIcon, { backgroundColor: colors.blue }]}>
      <Icon type="Feather" name="check" style={styles.icon} />
    </View>
  ) : (
    <View style={[styles.viewIcon, { backgroundColor: colors.yellow }]}>
      <Icon type="Feather" name="alert-triangle" style={styles.icon} />
    </View>
  );
const ResultModal = ({ docUserView, onClose, isVisible, state, isOnline }) => (
  <BottomModal isVisible={isVisible} onClose={onClose}>
    <FlatList
      data={docUserView}
      keyExtractor={item => item}
      ListEmptyComponent={<ListEmptyComponent />}
      renderItem={({ item: document }) => (
        <View style={styles.viewColumn}>
          <View style={styles.viewDocument}>
            <View style={styles.viewColumn}>
              {!!state.docForward.includes(document) ? (
                forwarded(document, state)
              ) : (
                <View>
                  <Spinner size="small" color={colors.blue} />
                </View>
              )}
            </View>
            <Document
              document={JSON.parse(document)}
              ErrorNetWork={
                !isOnline && (
                  <View style={styles.viewError}>
                    <Text style={{ color: '#e54d42' }} uppercase={false}>
                      Có lỗi xảy ra - Mất kết nối mạng
                    </Text>
                  </View>
                )
              }
            />
          </View>
        </View>
      )}
    />
    <Button
      block
      style={styles.btn}
      onPress={async () => {
        if (DeviceInfo.isTablet()) {
          await onClose();
        } else {
          await onClose();
          NavigationService.goBack();
        }
      }}
    >
      <Text style={styles.btnText} uppercase={false}>
        Đóng
      </Text>
    </Button>
  </BottomModal>
);
ResultModal.propTypes = {
  state: PropTypes.shape({
    docForwarded: PropTypes.arrayOf(PropTypes.string),
    docForward: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  docUserView: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
  isOnline: PropTypes.bool,

  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
};

ResultModal.defaultProps = {
  isOnline: true,
  docUserView: [],
  onClose() {},
  isVisible: false,
};
export default connect(state => ({ isOnline: selectors.isOnlineSelector(state) }))(ResultModal);
