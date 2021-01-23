import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Container, Content } from 'native-base';
import { StatusBar } from 'react-native';

import { actions as authActions, selectors } from 'eoffice/store/auth';
import variables from '../../native-base-theme/variables/commonColor';
import Cards from './Cards.container';
import HeaderOffline from './HeaderOffline.container';
import Summary from './Summary';
import useDashboardReport from './useDashboardReport';
import colors from '../../utils/colors';

const DashboardOfflineScreen = ({ selectedDeptRole }) => {
  const [state, actions] = useDashboardReport();

  useEffect(() => {
    actions.init();
  }, []);

  const currentDeptRoleReport = state.data?.find(
    row => row?.userDeptRole.id === selectedDeptRole?.id
  );
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <HeaderOffline />
      <Content contentContainerStyle={{ paddingBottom: variables.isIphoneX ? 58 : 24 }}>
        <Summary
          report={state}
          selectedDeptRole={selectedDeptRole}
          // setDeptRole={setDeptRole}
          hideSummary
        />
        <Cards report={currentDeptRoleReport} loading={state.loading} />
      </Content>
    </Container>
  );
};

DashboardOfflineScreen.propTypes = {
  selectedDeptRole: PropTypes.shape({}),
};
DashboardOfflineScreen.defaultProps = {
  selectedDeptRole: null,
};

const mapStateToProps = state => ({
  selectedDeptRole: selectors.deptRoleSelector(state),
});

const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardOfflineScreen);
