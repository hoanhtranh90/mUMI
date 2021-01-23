/* eslint-disable global-require,import/no-unresolved */

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Thumbnail } from 'native-base';


import { moderateScale } from 'eoffice/utils/scaling';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import OtpForm from './OtpForm.container';

const appIconSize = moderateScale(variables.deviceWidth * 0.27, -0.1);

const styles = StyleSheet.create({
  iconBtn: {
    borderWidth: 0,
    borderColor: '#f8f9fd',
    // paddingTop: moderateScale(variables.isIphoneX ? 105 : 51, 0.5),
    // paddingHorizontal: moderateScale(35, 2),
  },
  viewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginBottom: 0,
    paddingTop: appIconSize * 0.78,
    backgroundColor : '#fff',
    flexDirection: 'column',
    // width: variables.deviceWidth,
    // height: moderateScale(variables.deviceHeight * 0.7, 0.05),
    // ...Platform.select({
    //   ios: {
    //     marginTop: variables.isIphoneX ? appIconSize * 0.78 : appIconSize * 0.78 + 25,
    //   },
    //   android: {
    //     marginTop: appIconSize * 0.5,
    //   },
    // }),
  },
  logo: {
    height: '10%',
    width: '35%',
    // position: 'absolute',
    flexDirection: 'row',
    marginBottom: variables.isIphoneX ? 44 : 10,
  },
  appIcon: {
    width: appIconSize,
    height: appIconSize,
    position: 'absolute',
    left: (variables.deviceWidth - appIconSize) / 2,
    ...Platform.select({
      ios: {
        top: variables.isIphoneX ? appIconSize * 0.78 : appIconSize * 0.25,
      },
      android: {
        top: appIconSize * 0.5 - 25,
      },
    }),
  },
});


const OtpScreen = () => (
  <View style={styles.viewContainer}>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <OtpForm />
    <Thumbnail source={require('eoffice/assets/logo.png')} square style={styles.logo} />
    <Thumbnail source={require('eoffice/assets/app-icon.png')} square style={styles.appIcon} />
  </View>
);

export default OtpScreen;
