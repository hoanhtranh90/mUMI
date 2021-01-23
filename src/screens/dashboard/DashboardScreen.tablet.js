import { ScrollView, RefreshControl, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import useDashboardReport from './useDashboardReport';
import Summary from './tablet/Summary';
import Cards from './tablet/Cards.container';
import * as service from '../../store/auth/service';
import firebase from 'react-native-firebase';
import utilService from '../../service/utils';

const DashboardScreen = ({ selectedDeptRole, setDeptRole }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [state, actions] = useDashboardReport();

  useEffect(() => {
    actions.init();
    utilService.refreshNotificationUnseen();
    const refreshDashboard = DeviceEventEmitter.addListener('refreshDashboard', () => {
      actions.init();
    });
    return () => {
      refreshDashboard.remove();
    };
  }, []);

  async function getUnseen() {
    const unSeen = await service.getUnseenNotify();
  }

  useEffect(
    () => {
      if (state.loading === false) actions.getUnseenNoti(state?.data[0].userDeptRole.id);
    },
    [state?.data]
  );

  return (
    <View style={{ backgroundColor: '#f8f9fd', flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          height: variables.deviceHeight * 0.5,
          width: variables.deviceWidth,
          backgroundColor: '#007aff',
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            colors={[colors.white]}
            tintColor={colors.white}
            refreshing={refreshing}
            onRefresh={() => {
              actions.init();
              utilService.refreshNotificationUnseen();
              setRefreshing(true);
              DeviceEventEmitter.emit('refreshDashboard');
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }
      >
        <Summary report={state} selectedDeptRole={selectedDeptRole} setDeptRole={setDeptRole} />
        <Cards />
      </ScrollView>
    </View>
  );
};

DashboardScreen.propTypes = {
  setDeptRole: PropTypes.func.isRequired,
  selectedDeptRole: PropTypes.shape({}),
};
DashboardScreen.defaultProps = {
  selectedDeptRole: null,
};

const mapStateToProps = state => ({
  selectedDeptRole: selectors.deptRoleSelector(state),
  deptRoles: selectors.deptRolesSelector(state),
  menuConfig: selectors.menuConfigSelector(state),
});

const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
  setMenuConfig: authActions.setMenuConfig,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
