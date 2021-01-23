import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KHACH_SAN_TYPE } from '../../../../constants/administrative';
import { approveRequest, cancelRequest } from '../../../../store/administrative/vanPhongPham/reducer';
import { connect } from 'react-redux';
import CreateEditHeader from '../create-edit/CreateEditHeader';
import DetailBody from './DetailBody';

const DetailScreen = ({
  editMode,
  vanPhongPhamDetail,
  cancelRequest,
  approveRequest,
  isCanAcceptRequest,
  isCanCancelRequest,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateEditHeader editMode={editMode} />
      <DetailBody
        vanPhongPhamDetail={vanPhongPhamDetail}
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

const mapStateToProps = ({ vanPhongPham }) => ({
  vanPhongPhamDetail: vanPhongPham.vanPhongPhamDetail,
  editMode: vanPhongPham.editMode,
  isCanCancelRequest: vanPhongPham.isCanCancelRequest,
  isCanAcceptRequest: vanPhongPham.isCanAcceptRequest,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
