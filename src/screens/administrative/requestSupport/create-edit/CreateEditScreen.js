import { View } from 'react-native';
import React from 'react';
import { createRequest } from '../../../../store/administrative/requestSupport/reducer';
import { connect } from 'react-redux';
import CreateEditHeader from './CreateEditHeader';
import CreateEditBody from './CreateEditBody';
import { selectors } from '../../../../store/auth';

const CreateEditScreen = ({ editMode, createRequest,currentUserDeptRole }) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateEditHeader editMode={editMode} />
      <CreateEditBody createRequest={createRequest} currentUserDeptRole={currentUserDeptRole} />
    </View>
  );
};

const mapDispatchToProps = {
  createRequest: createRequest,
};

const mapStateToProps = state => ({
  editMode: state.requestSupport.editMode,
  currentUserDeptRole: selectors.deptRoleSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditScreen);
