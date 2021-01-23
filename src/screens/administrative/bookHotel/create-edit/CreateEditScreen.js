import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KHACH_SAN_TYPE } from '../../../../constants/administrative';
import {
  createRequest,
} from '../../../../store/administrative/bookHotel/reducer';
import { connect } from 'react-redux';
import CreateEditHeader from './CreateEditHeader';
import CreateEditBody from './CreateEditBody';

const CreateEditScreen = ({ editMode, createRequest, navigation  }) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateEditHeader editMode={editMode} />
      <CreateEditBody createRequest={createRequest} navigation={navigation} />
    </View>
  );
};

const mapDispatchToProps = {
  createRequest: createRequest,
};

const mapStateToProps = ({ bookHotel }) => ({
  bookHotelDetail: bookHotel.bookHotelDetail,
  editMode: bookHotel.editMode,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditScreen);
