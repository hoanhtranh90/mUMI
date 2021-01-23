import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { selectors } from '../store/app';
import variables from '../native-base-theme/variables/commonColor';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: variables.deviceWidth,
    height: variables.isIphoneX ? 60 : 30,
    paddingTop: variables.isIphoneX ? 30 : 0,
    position: 'absolute',
  },
  text: {
    color: '#fff',
  },
});

const OfflineNotice = ({ isOnline }) => {
  if (isOnline) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Mất kết nối Internet, vui lòng kiểm tra lại</Text>
    </View>
  );
};

OfflineNotice.propTypes = {
  isOnline: PropTypes.bool,
};
OfflineNotice.defaultProps = {
  isOnline: true,
};

export default connect(state => ({ isOnline: selectors.isOnlineSelector(state) }))(OfflineNotice);
