import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Text, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import variables from '../../native-base-theme/variables/platform';
import colors from '../../utils/colors';
import * as authService from '../../store/auth/service';

let paddingTop = 0;
if (variables.isIphoneX) {
  paddingTop = 42;
} else if (variables.platform === 'ios') {
  paddingTop = 18;
}

const styles = StyleSheet.create({
  blueBg: {
    backgroundColor: colors.blue,
  },
  header: {
    paddingTop,
    paddingBottom: 24,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  avatar: {
    backgroundColor: colors.lightYellow,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
  },
  initial: {
    color: colors.yellow,
    fontSize: 14,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 8,
  },
  notiBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  notiIcon: {
    color: colors.blue,
    fontSize: 16,
    marginRight: 8,
  },
  notiText: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  whiteBg: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    height: 16,
  },
});
const imgBackground = require('eoffice/assets/headerBg.jpg');

const HeaderOffline = ({ navigation }) => (
  <View style={styles.blueBg}>
    <ImageBackground style={styles.header} source={imgBackground}>
      <Text style={{ color: 'white', paddingBottom: 8 }}>Mất kết nối mạng</Text>
      <Icon name="wifi-off" type="Feather" style={{ color: 'white', paddingBottom: 8 }} />
      <TouchableOpacity
        style={styles.notiBtn}
        onPress={async () => {
          const token = await AsyncStorage.getItem('userToken');
          await authService.getMe1(token).then(async res => {
            if (res.status === 200) {
              navigation.navigate('AuthLoading');
            }
          });
        }}
      >
        <Text style={styles.notiText}>Tải lại</Text>
      </TouchableOpacity>
    </ImageBackground>
    <View style={styles.whiteBg} />
  </View>
);

HeaderOffline.propTypes = {
  user: PropTypes.shape({}),
};
HeaderOffline.defaultProps = {
  user: {},
};

export default withNavigation(HeaderOffline);
