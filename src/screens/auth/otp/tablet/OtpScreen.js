/* eslint-disable global-require,import/no-unresolved */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Thumbnail } from 'native-base';

import { moderateScale } from 'eoffice/utils/scaling';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import OtpForm from './OtpForm.container';

const appIconSize = moderateScale(variables.deviceWidth * 0.27, -0.1);

const styles = StyleSheet.create({
  logo: {
    width: variables.deviceWidth * 0.15,
    height: variables.deviceHeight * 0.05,
    position: 'absolute',
    bottom: 50,
    flex : 1
  },
  backgroundBlue : {
    position: 'absolute',
    top : 0,
    width : '100%',
    height : variables.deviceHeight*0.35,
    backgroundColor : '#007aff'
  },
  appIcon: {
    width: variables.deviceWidth * 0.11,
    height: variables.deviceHeight * 0.15,
    top: -(variables.deviceHeight * 0.15) / 2,
    left: (0.34 * variables.deviceWidth) / 2 - (variables.deviceWidth * 0.11) / 2,
  },
  viewContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  view: { flex: 10 },
  imageBg: {
    width: 0.34 * variables.deviceWidth,
    height: 0.57 * variables.deviceHeight,
    left: 0.55 * variables.deviceWidth,
    top: 0.26 * variables.deviceHeight,
  },
  iconBtn: {
    borderWidth: 0,
    borderColor: '#f8f9fd',
    paddingTop: (variables.deviceHeight * 0.15) / 2,
    // paddingHorizontal: moderateScale(35, 2),
  },
});

const OtpScreen = () => (
  <View style={styles.viewContainer}>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <View style={styles.backgroundBlue}></View>
    <OtpForm heightDecrease={-(variables.deviceHeight * 0.15) / 2} />
    <Thumbnail source={require('eoffice/assets/logo.png')} square style={styles.logo} />

  </View>
);

export default OtpScreen;
