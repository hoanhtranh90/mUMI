import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KHACH_SAN_TYPE } from '../../../../constants/administrative';
import {
  approveRequest,
  cancelRequest, updateRequest,
} from '../../../../store/administrative/bookHotel/reducer';
import { connect } from 'react-redux';
import CreateEditHeader from '../create-edit/CreateEditHeader';
import DetailBody from './DetailBody';

const DetailScreen = ({
  editMode,
  bookHotelDetail,
  cancelRequest,
  approveRequest,
  updateRequest
}) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateEditHeader editMode={editMode} />
      <DetailBody
        bookHotelDetail={bookHotelDetail}
        cancelRequest={cancelRequest}
        approveRequest={approveRequest}
        updateRequest={updateRequest}
      />
    </View>
  );
};

const mapDispatchToProps = {
  approveRequest: approveRequest,
  cancelRequest: cancelRequest,
  updateRequest: updateRequest,
};

const mapStateToProps = ({ bookHotel }) => ({
  bookHotelDetail: bookHotel.bookHotelDetail,
  editMode: bookHotel.editMode,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
