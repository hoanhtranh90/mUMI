/* eslint-disable import/no-extraneous-dependencies */
import React, {useState, useEffect} from 'react';
import {StyleSheet } from 'react-native';
import { Title, View, Text } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';
import NavigationService from "../../../../utils/NavigationService";
import {CHI_DAO_STATE} from "../../../../constants/common";
import * as service from "../../../../store/administrative/theoDoiChiDaoLanhDao/service";
import DeviceInfo from 'react-native-device-info'
import {connect} from "react-redux";
import DetailScreen from "./DetailScreen";
import {actions, selectors} from "../../../../store/administrative/theoDoiChiDaoLanhDao";

const styles = StyleSheet.create({
  grayBg: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },

  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const DetailHeader = ({ navigation, setViewDetail }) => {

  return (
    <CustomHeader
      Left={
          <IconButton
            icon="arrow-left"
            iconStyle={{ color: colors.gray }}
            style={styles.grayBg}
            onPress={() => {
              if (DeviceInfo.isTablet()) {
                setViewDetail(false)
              } else {
                NavigationService.goBack()
              }
            }}
          />
      }
      hasBorder
      Content={<Title style={styles.titleStyleContent}>Chi tiết</Title>}
    />
  );
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = {
  setViewDetail: actions.setViewDetail
};

export default connect(
  null,
  mapDispatchToProps
)(DetailHeader);

