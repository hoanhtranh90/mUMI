import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Container, Content } from 'native-base';
import { StatusBar, RefreshControl, DeviceEventEmitter } from 'react-native';
import utilService from '../../service/utils';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import variables from '../../native-base-theme/variables/commonColor';
import Cards from './Cards.container';
import Header from './Header.container';
import Summary from './Summary';
import useDashboardReport from './useDashboardReport';
import colors from '../../utils/colors';
import * as service from '../../store/auth/service';
import firebase from 'react-native-firebase';

const DashboardScreen = ({ selectedDeptRole, setDeptRole, setRoleId }) => {
  const [state, actions] = useDashboardReport();
  const [refreshing, setRefreshing] = useState(false);

  const currentDeptRoleReport = state.data?.find(
    row => row?.userDeptRole.id === selectedDeptRole?.id
  );
  setRoleId(currentDeptRoleReport?.userDeptRole?.roleId);

  useEffect(() => {
    actions.init();
    utilService.refreshNotificationUnseen();
  }, []);

  useEffect(
    () => {
      let index = 0;
      if (state.loading === false) {
        if (state.data.length > 0) {
          for (let i = 0; i < state.data.length; i += 1) {
            if (state.data[i].userDeptRole.id === selectedDeptRole.id) {
              index = i;
              break;
            }
          }
        }
        actions.getMenuConfig(index);
        actions.getUnseenNoti(
          currentDeptRoleReport ? currentDeptRoleReport.userDeptRole.id : currentDeptRoleReport
        );
      }
    },
    [currentDeptRoleReport]
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content"  />
      <Header countUnseenNoti={state.countUnseenNoti} />
      <Content
        refreshControl={
          <RefreshControl
            colors={[colors.blue]}
            tintColor={colors.blue}
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
        contentContainerStyle={{ paddingBottom: variables.isIphoneX ? 58 : 24 }}
      >
        <Summary report={state} />
        <Cards
          menuConfig={state.menuConfig}
          report={currentDeptRoleReport !== undefined ? currentDeptRoleReport : state.data[0]}
          loading={state.loading}
        />
      </Content>
    </Container>
  );
};

DashboardScreen.propTypes = {
  setDeptRole: PropTypes.func.isRequired,
  setRoleId: PropTypes.func.isRequired,
  selectedDeptRole: PropTypes.shape({}),
};
DashboardScreen.defaultProps = {
  selectedDeptRole: null,
};

const mapStateToProps = state => ({
  selectedDeptRole: selectors.deptRoleSelector(state),
  menuConfig: selectors.menuConfigSelector(state),
});

const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
  getMenuConfig: authActions.getMenuConfig,
  setRoleId: authActions.setRoleId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
