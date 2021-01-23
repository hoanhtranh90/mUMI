import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import useDashboardReport from './useDashboardReport';
import SummaryOffline from './tablet/SummaryOffline';
import Cards from './tablet/Cards.container';

const DashboardScreen = ({ selectedDeptRole, setDeptRole }) => {
  const [state, actions] = useDashboardReport();

  useEffect(() => {
    actions.init();
  }, []);

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
      <ScrollView style={{ flex: 1 }}>
        <SummaryOffline
          report={state}
          selectedDeptRole={selectedDeptRole}
          setDeptRole={setDeptRole}
        />
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
});

const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
