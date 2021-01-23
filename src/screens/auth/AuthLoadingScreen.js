import PropTypes from 'prop-types';
import React from 'react';
import { Linking, Platform, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';
import { service } from 'eoffice/store/auth';
import ModalChangeLog from './ModalChangeLog';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      changeLogs: [],
    };
    // this.bootstrapAsync();
    this.actionContinue();

  }

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      >
        <View>
          <Spinner color="#044987" />
        </View>
        <ModalChangeLog
          showModal={this.state.showPopup}
          changeLogs={this.state.changeLogs}
          onCancel={this.actionContinue}
          onUpdate={this.actionUpdate}
        />
      </View>
    );
  }

  checkVersion = async () => {
    const changeLogs = await service.checkVersion();
    this.setState({
      showPopup: changeLogs.length > 0,
      changeLogs: changeLogs,
    });
    if (changeLogs.length === 0) {
      this.actionContinue();
    }
  };

  actionUpdate = async () => {
    if (Platform.OS === 'ios') {
      const link = `itms-apps://itunes.apple.com/us/app/id1460659569?mt=8`;
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link);
        },
        err => console.log(err)
      );
    } else {
      await Linking.openURL('market://details?id=vn.mobifone.eoffice');
    }
  };

  actionContinue = async () => {
    const { fetchInfo, navigation } = this.props;
    const otpToken = await AsyncStorage.getItem('otpToken');
    const userToken = await AsyncStorage.getItem('userToken');
    if (!fetchInfo) {
      navigation.navigate('Auth');
    }
    if (otpToken && userToken) {
      fetchInfo();
    } else {
      navigation.navigate('Auth');
    }
  };
  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    await this.checkVersion();
  };
}

AuthLoadingScreen.propTypes = {
  fetchInfo: PropTypes.func,
};
AuthLoadingScreen.defaultProps = {
  fetchInfo() {},
};

export default AuthLoadingScreen;
