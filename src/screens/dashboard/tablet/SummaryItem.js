import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import { actions as listActions } from 'eoffice/store/documents/list';
import * as DocumentNavigation from '../../../utils/DocumentNavigation';
import colors from '../../../utils/colors';
import { DOCUMENT_TYPE } from '../../../constants/documents';
import SummaryItemContent from './SummaryItemContent';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  position: {
    flex: 25,
    flexDirection: 'row',
  },
  positionText: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 10,
  },
  selected: {
    color: colors.blue,
  },
});

const SummaryItem = ({
  countOfIncomingDoc,
  countOfOutGoingDoc,
  countOfUnreadBanHanhOutGoingDoc,
  countOfUnreadIncomingDoc,
  countOfUnreadOutGoingDoc,
  userDeptRole,
  resetDocuments,
  deptRoles,
  setDeptRole,
}) => {
  const getPositionName = (user, users) => {
    const result = users.find(ele => ele.id === user.id);
    return result?.positionName;
  };

  const getDeptName = (user, users) => {
    const result = users.find(ele => ele.id === user.id);
    return result?.deptName;
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.position}>
        <Text style={styles.positionText}>
          {getPositionName(userDeptRole, deptRoles)} - {getDeptName(userDeptRole, deptRoles)}
        </Text>
      </View>
      <SummaryItemContent
        countSum={countOfIncomingDoc}
        countOfUnread={countOfUnreadIncomingDoc}
        onPress={() => {
          setDeptRole(userDeptRole);
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
          resetDocuments();
          DocumentNavigation.goToVbDenCxl();
        }}
      />
      <SummaryItemContent
        countSum={countOfOutGoingDoc}
        countOfUnread={countOfUnreadOutGoingDoc}
        onPress={() => {
          setDeptRole(userDeptRole);
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
          resetDocuments();
          DocumentNavigation.goToDuThaoCxl();
        }}
      />
      <SummaryItemContent
        countSum={countOfUnreadBanHanhOutGoingDoc}
        onPress={() => {
          setDeptRole(userDeptRole);
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
          resetDocuments();
          DocumentNavigation.goToVbPhatHanh();
        }}
      />
      {/* <SummaryItemContent countSum={0} countOfUnread={0} onPress={() => {}} />
    <SummaryItemContent countSum={0} countOfUnread={0} onPress={() => {}} /> */}
    </View>
  );
};

SummaryItem.propTypes = {
  userDeptRole: PropTypes.shape({
    id: PropTypes.string.isRequired,
    positionName: PropTypes.string.isRequired,
  }).isRequired,
  setDeptRole: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  countOfIncomingDoc: PropTypes.number,
  countOfOutGoingDoc: PropTypes.number,
  countOfUnreadBanHanhOutGoingDoc: PropTypes.number,
  countOfUnreadIncomingDoc: PropTypes.number,
  countOfUnreadOutGoingDoc: PropTypes.number,
  deptRoles: PropTypes.arrayOf(PropTypes.shape({})),
};
SummaryItem.defaultProps = {
  countOfIncomingDoc: 0,
  countOfOutGoingDoc: 0,
  countOfUnreadBanHanhOutGoingDoc: 0,
  countOfUnreadIncomingDoc: 0,
  countOfUnreadOutGoingDoc: 0,
  deptRoles: [],
};

const mapStateToProps = state => ({
  selectedDeptRole: selectors.deptRoleSelector(state),
  deptRoles: selectors.deptRolesSelector(state),
});

const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
  resetDocuments: listActions.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryItem);
