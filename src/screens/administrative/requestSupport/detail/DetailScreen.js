import { View } from 'react-native';
import React from 'react';
import { approveRequest, cancelRequest } from '../../../../store/administrative/requestSupport/reducer';
import { connect } from 'react-redux';
import CreateEditHeader from '../create-edit/CreateEditHeader';
import DetailBody from './DetailBody';

const DetailScreen = ({
  editMode,
  requestSupportDetail,
  cancelRequest,
  approveRequest,
  isCanAcceptRequest,
  isCanCancelRequest,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateEditHeader editMode={editMode} />
      <DetailBody
        requestSupportDetail={requestSupportDetail}
        cancelRequest={cancelRequest}
        approveRequest={approveRequest}
        isCanAcceptRequest={isCanAcceptRequest}
        isCanCancelRequest={isCanCancelRequest}
      />
    </View>
  );
};

const mapDispatchToProps = {
  approveRequest: approveRequest,
  cancelRequest: cancelRequest,
};

const mapStateToProps = ({ requestSupport }) => ({
  requestSupportDetail: requestSupport.requestSupportDetail,
  editMode: requestSupport.editMode,
  isCanCancelRequest: requestSupport.isCanCancelRequest,
  isCanAcceptRequest: requestSupport.isCanAcceptRequest,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
