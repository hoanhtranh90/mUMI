import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

import variables from '../../native-base-theme/variables/platform';
import colors from '../../utils/colors';

let paddingTop = 0;
if (variables.isIphoneX) {
  paddingTop = 42;
} else if (variables.platform === 'ios') {
  paddingTop = 18;
}

const styles = StyleSheet.create({
  blueBg: {
    backgroundColor: colors.white,
  },
  header: {
    paddingTop,
    paddingBottom: 24,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
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

const Header = ({
                  navigation,
                  user,
                  getNotifications,
                  countUnseenNoti,
                  refreshNotifications,
                  notificationByRole,
                }) => {
  return (
    <SafeAreaView style={styles.blueBg}>
      <View
        style={{
          padding: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 20, color: colors.gray }}>
            Xin chào,
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{user?.fullName ? user?.fullName : ''}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {
          refreshNotifications();
          getNotifications();
          navigation.navigate('Notifications');
        }}>
          <Icon name='bell' style={{ color: colors.darkGray, fontSize: 26 }} type='MaterialCommunityIcons' />
        </TouchableOpacity>
      </View>
      {/*<View style={styles.header}>*/}
      {/*  <TouchableOpacity*/}
      {/*    style={styles.avatar}*/}
      {/*    onPress={() => {*/}
      {/*      navigation.openDrawer();*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Text style={styles.initial}>{user?.fullName?.charAt(0)?.toUpperCase()}</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <Text style={styles.welcome}>Xin chào {user?.fullName ? user?.fullName : ''}</Text>*/}
      {/*  <TouchableOpacity*/}
      {/*    style={styles.notiBtn}*/}
      {/*    onPress={() => {*/}
      {/*      refreshNotifications();*/}
      {/*      getNotifications();*/}
      {/*      navigation.navigate('Notifications');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Icon name="bell" type="MaterialCommunityIcons" style={styles.notiIcon} />*/}
      {/*    <Text style={styles.notiText}>{notificationByRole} Thông báo mới</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      {/*<View style={styles.whiteBg} />*/}
    </SafeAreaView>
  );
};

Header.propTypes = {
  user: PropTypes.shape({}),
  getNotifications: PropTypes.func.isRequired,
  countUnseenNoti: PropTypes.number,
  refreshNotifications: PropTypes.func.isRequired,
};
Header.defaultProps = {
  user: {},
  countUnseenNoti: 0,
};

export default withNavigation(Header);
