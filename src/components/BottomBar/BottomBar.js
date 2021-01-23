import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { Button, Icon, Picker, Header, Left, Body, Title, Right, Text } from 'native-base';
import colors from '../../utils/colors';
import NotificationButton from './NotificationButton';
import RouteButtons from './RouteButtons';
import HcCalendarButton from './HcCalendarButton';
import NotificationTab from './NotificationTab';
import useDashboardReport from '../../screens/dashboard/useDashboardReport';

const styles = StyleSheet.create({
  bar: {
    height: 68,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  side: { width: '20%', flexDirection: 'row', alignItems: 'center' },
  rightSide: {
    justifyContent: 'flex-end',
  },
  btn: {
    alignSelf: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 24,
  },
  pickerContainer: {
    width: '66.7%',
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  picker: {
    height: 32,
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: 'stretch',
    flexGrow: 0,
  },
  pickerIcon: {
    color: colors.blue,
    fontSize: 18,
    lineHeight: 18,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
  },
  pickerText: {
    fontSize: 14,
    color: 'white',
    paddingLeft: 0,
    paddingRight: 4,
    flexShrink: 1,
  },
});

const BottomBar = ({
  changeDeptRole,
  deptRole,
  deptRoles,
  documentMode,
  logout,
  navigation,
  safeAreaInset,
  resetDocuments,
  getNotifications,
  refreshNotifications,
  isShowDetailHcCalendar,
                     notificationByRole
}) => {
  const [statusNoti, setStatusNoti] = useState(false);
  const [state, actions] = useDashboardReport();
  const [isShowBtnCalendar, setIsShowBtnCalendar] = useState(false);

  useEffect(
    () => {
      setIsShowBtnCalendar(isShowDetailHcCalendar);
    },
    [isShowDetailHcCalendar]
  );

  const currentDeptRoleReport = state.data?.find(row => row?.userDeptRole.id === deptRole?.id);

  useEffect(() => {
    actions.init();
  }, []);

  useEffect(
    () => {
      const refreshDashboard = DeviceEventEmitter.addListener('refreshDashboard', () => {
        actions.getUnseenNoti(
          currentDeptRoleReport ? currentDeptRoleReport.userDeptRole.id : currentDeptRoleReport
        );
      });
      if (currentDeptRoleReport !== undefined)
        actions.getUnseenNoti(
          currentDeptRoleReport ? currentDeptRoleReport.userDeptRole.id : currentDeptRoleReport
        );
      return () => {
        refreshDashboard.remove();
      };
    },
    [currentDeptRoleReport]
  );

  return (
    <View>
      {statusNoti && (
        <NotificationTab
          setVisible={() => {
            setStatusNoti(!statusNoti);
          }}
        />
      )}
      <SafeAreaView style={styles.bar} forceInset={safeAreaInset}>
        {!isShowBtnCalendar && (
          <View style={styles.side}>
            <Button
              icon
              transparent
              style={styles.btn}
              onPress={() => {
                actions.init();
                DeviceEventEmitter.emit('refreshDashboard');
                navigation.navigate('Dashboard');
                actions.init();
              }}
            >
              <Icon name="home" style={styles.icon} />
            </Button>
            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                renderHeader={backAction => (
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction} style={{ paddingLeft: 10 }}>
                        <Text>Trở lại</Text>
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: '#333', fontSize: 18 }}>Chọn một</Title>
                    </Body>
                    <Right />
                  </Header>
                )}
                selectedValue={deptRole?.id}
                textStyle={styles.pickerText}
                iosIcon={<Icon name="chevron-down" style={styles.pickerIcon} />}
                style={styles.picker}
                onValueChange={val => {
                  const newDr = deptRoles.find(d => d.id === val);
                  if (newDr) {
                    changeDeptRole(newDr);
                    navigation.navigate('Dashboard');
                    actions.init();
                  }
                }}
              >
                {deptRoles.map(({ deptName, id, positionName }) => (
                  <Picker.Item
                    key={id}
                    label={`${positionName}${deptName !== null ? ` - ${deptName}` : ''}`}
                    value={id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}
        {!isShowBtnCalendar && (
          <RouteButtons
            documentMode={documentMode}
            navigation={navigation}
            resetDocuments={resetDocuments}
          />
        )}
        {isShowBtnCalendar && <HcCalendarButton />}
        {!isShowBtnCalendar && (
          <View style={[styles.side, styles.rightSide]}>
            <NotificationButton
              hasNew={notificationByRole}
              style={styles.btn}
              onPress={() => {
                getNotifications();
                setStatusNoti(!statusNoti);
              }}
            />
            <Button
              icon
              transparent
              style={styles.btn}
              onPress={() => {
                refreshNotifications();
                logout();
              }}
            >
              <Icon name="log-out" style={styles.icon} />
            </Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

BottomBar.propTypes = {
  changeDeptRole: PropTypes.func.isRequired,
  documentMode: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,

  deptRole: PropTypes.shape({}),
  deptRoles: PropTypes.arrayOf(PropTypes.shape({})),
  safeAreaInset: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
  resetDocuments: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  refreshNotifications: PropTypes.func.isRequired,
};
BottomBar.defaultProps = {
  deptRole: null,
  deptRoles: [],
  safeAreaInset: undefined,
  isShowDetailHcCalendar: false,
};

export default BottomBar;
