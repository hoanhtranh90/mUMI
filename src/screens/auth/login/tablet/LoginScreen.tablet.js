/* eslint-disable global-require,import/no-unresolved */

import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { Thumbnail } from 'native-base';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import LoginForm from './LoginForm.container';

const styles = StyleSheet.create({
  logo: {
    width: variables.deviceWidth * 0.15,
    height: variables.deviceHeight * 0.05,
    left: variables.deviceWidth / 2 - (variables.deviceWidth * 0.15) / 2,
    flex: 1,
  },
  appIcon: {
    width: variables.deviceWidth * 0.11,
    height: variables.deviceHeight * 0.15,
    top: -(variables.deviceHeight * 0.15) / 2,
    left: (0.34 * variables.deviceWidth) / 2 - (variables.deviceWidth * 0.11) / 2,
  },
  viewContainer: { flex: 1 },
  view: { flex: 10 },
  imageBg: {
    width: 0.34 * variables.deviceWidth,
    height: 0.57 * variables.deviceHeight,
    left: 0.55 * variables.deviceWidth,
    top: 0.26 * variables.deviceHeight,
  },
});
const LoginScreen = () => (
  <View style={styles.viewContainer}>
    <ImageBackground
      source={require('eoffice/assets/decoBg-1.jpg')}
      style={{ width: variables.deviceWidth * 0.62, height: variables.deviceHeight }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.view}>
        <ImageBackground
          source={require('eoffice/assets/loginBg.png')}
          resizeMode="contain"
          style={styles.imageBg}
        >
          <Thumbnail source={require('eoffice/assets/app-icon.png')} style={styles.appIcon} />
          <LoginForm heightDecrease={-(variables.deviceHeight * 0.15) / 2} />
        </ImageBackground>
      </View>
      <Thumbnail source={require('eoffice/assets/logo.png')} style={styles.logo} />
    </ImageBackground>
  </View>
);

export default LoginScreen;
